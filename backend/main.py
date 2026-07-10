import os
import json
import requests
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend.services.crawler import get_scraped_company_text
from backend.services.llm_service import (
    generate_outreach_email,
    generate_strategy_report,
    chat_interview,
    analyze_correspondence,
    format_voice_note
)

app = FastAPI(title="Dutch EdTech Outreach API")

# Enable CORS for frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
COMPANIES_FILE = os.path.join(DATA_DIR, "companies_data.json")
RAG_FILE = os.path.join(DATA_DIR, "rag_store.json")
REPORTS_FILE = os.path.join(DATA_DIR, "strategy_reports.json")
TRACKER_FILE = os.path.join(DATA_DIR, "tracker_data.json")
CORRESPONDENCE_FILE = os.path.join(DATA_DIR, "correspondence_data.json")

FIREBASE_URL = os.getenv("FIREBASE_URL")
FIREBASE_SECRET = os.getenv("FIREBASE_SECRET")

def load_json(filepath):
    # 1. Fallback to local files if Firebase is not configured (local dev)
    if not FIREBASE_URL:
        if not os.path.exists(filepath):
            return {}
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)

    # 2. Query Firebase
    filename = os.path.basename(filepath).replace(".json", "")
    url = f"{FIREBASE_URL}/{filename}.json"
    if FIREBASE_SECRET:
        url += f"?auth={FIREBASE_SECRET}"

    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            val = response.json()
            return val if val is not None else {}
    except Exception as e:
        print(f"Error loading {filename} from Firebase: {e}")

    # Fallback if Firebase API fails
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_json(filepath, data):
    # 1. Always save locally first (for backup / local consistency)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    # 2. Upload to Firebase
    if FIREBASE_URL:
        filename = os.path.basename(filepath).replace(".json", "")
        url = f"{FIREBASE_URL}/{filename}.json"
        if FIREBASE_SECRET:
            url += f"?auth={FIREBASE_SECRET}"
        try:
            requests.put(url, json=data, timeout=10)
        except Exception as e:
            print(f"Error saving {filename} to Firebase: {e}")

# Pydantic models
class RAGUpdateModel(BaseModel):
    serhat_kabais: dict
    duygu_kabais: dict
    netherlands_visit_goals: dict = {}

class ChatInterviewRequest(BaseModel):
    company_id: str
    chat_history: list

class EmailGenerateRequest(BaseModel):
    company_id: str
    force_refresh: bool = False
    custom_notes: str = ""

class TrackerUpdateModel(BaseModel):
    company_id: str
    contacted: bool

class AddMessageRequest(BaseModel):
    type: str  # 'sent' or 'received'
    content: str
    date: str

class VoiceNoteRequest(BaseModel):
    raw_transcript: str

@app.get("/api/companies")
def get_companies():
    result = load_json(COMPANIES_FILE)
    return result if isinstance(result, list) else []

@app.get("/api/companies/{company_id}")
def get_company(company_id: str):
    companies = load_json(COMPANIES_FILE)
    for c in companies:
        if c.get("id") == company_id:
            return c
    raise HTTPException(status_code=404, detail="Company not found")

@app.get("/api/rag/profile")
def get_rag_profile():
    return load_json(RAG_FILE)

@app.post("/api/rag/profile")
def update_rag_profile(profile: RAGUpdateModel):
    save_json(RAG_FILE, profile.model_dump())
    return {"status": "success", "message": "RAG profile updated successfully"}

@app.get("/api/crawler/fetch")
def fetch_company_website(company_id: str, url: str, force_refresh: bool = False):
    text = get_scraped_company_text(company_id, url, force_refresh)
    return {"company_id": company_id, "url": url, "scraped_text_preview": text[:500] + "...", "total_words": len(text.split())}


@app.post("/api/chat/interview")
def run_chat_interview(req: ChatInterviewRequest):
    companies = load_json(COMPANIES_FILE)
    company = next((c for c in companies if c["id"] == req.company_id), None)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    rag_data = load_json(RAG_FILE)
    response = chat_interview(
        company_name=company["name"],
        company_focus=company["focus"],
        rag_data=rag_data,
        chat_history=req.chat_history
    )
    return {"reply": response}

@app.post("/api/email/generate")

def generate_email(req: EmailGenerateRequest):
    companies = load_json(COMPANIES_FILE)
    target_company = None
    for c in companies:
        if c.get("id") == req.company_id:
            target_company = c
            break
            
    if not target_company:
        raise HTTPException(status_code=404, detail="Company not found")
        
    rag_data = load_json(RAG_FILE)
    
    # Scrape website text
    url = target_company.get("website", "")
    scraped_text = ""
    if url:
        scraped_text = get_scraped_company_text(req.company_id, url, req.force_refresh)
        
    email_content = generate_outreach_email(
        company_name=target_company.get("name"),
        company_focus=target_company.get("focus_area"),
        why_recommended=target_company.get("why_recommended"),
        scraped_text=scraped_text,
        rag_data=rag_data,
        custom_notes=req.custom_notes
    )
    
    return {
        "company_id": req.company_id,
        "email_content": email_content
    }


@app.post("/api/strategy/generate")
def generate_strategy(req: EmailGenerateRequest): # Reuse the same request model
    companies = load_json(COMPANIES_FILE)
    target_company = None
    for c in companies:
        if c.get("id") == req.company_id:
            target_company = c
            break
            
    if not target_company:
        raise HTTPException(status_code=404, detail="Company not found")
        
    rag_data = load_json(RAG_FILE)
    
    # Scrape website text
    url = target_company.get("website", "")
    scraped_text = ""
    if url:
        scraped_text = get_scraped_company_text(req.company_id, url, req.force_refresh)
        
    report_content = generate_strategy_report(
        company_name=target_company.get("name"),
        company_focus=target_company.get("focus_area"),
        why_recommended=target_company.get("why_recommended"),
        scraped_text=scraped_text,
        rag_data=rag_data
    )
    
    return {
        "company_id": req.company_id,
        "strategy_report": report_content
    }


@app.get("/api/strategy/reports")
def get_strategy_reports():
    return load_json(REPORTS_FILE)

@app.get("/api/tracker")


def get_tracker():
    return load_json(TRACKER_FILE)

@app.post("/api/tracker")
def update_tracker(req: TrackerUpdateModel):
    data = load_json(TRACKER_FILE)
    if "contacted" not in data:
        data["contacted"] = []
    
    if req.contacted and req.company_id not in data["contacted"]:
        data["contacted"].append(req.company_id)
    elif not req.contacted and req.company_id in data["contacted"]:
        data["contacted"].remove(req.company_id)
        
    save_json(TRACKER_FILE, data)
    return {"status": "success", "contacted": data["contacted"]}


@app.get("/api/correspondence/{company_id}")
def get_correspondence(company_id: str):
    data = load_json(CORRESPONDENCE_FILE)
    company_data = data.get(company_id, {"messages": [], "analysis": "", "notes": []})
    # Ensure all list keys are present
    if "messages" not in company_data:
        company_data["messages"] = []
    if "analysis" not in company_data:
        company_data["analysis"] = ""
    if "notes" not in company_data:
        company_data["notes"] = []
    return company_data


@app.post("/api/correspondence/{company_id}/message")
def add_correspondence_message(company_id: str, req: AddMessageRequest):
    import time
    data = load_json(CORRESPONDENCE_FILE)
    if company_id not in data:
        data[company_id] = {"messages": [], "analysis": "", "notes": []}
    
    # Ensure lists exist
    for key in ["messages", "notes"]:
        if key not in data[company_id]:
            data[company_id][key] = []
    if "analysis" not in data[company_id]:
        data[company_id]["analysis"] = ""

    new_msg = {
        "id": f"msg_{int(time.time())}_{len(data[company_id]['messages'])}",
        "type": req.type,
        "content": req.content,
        "date": req.date,
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
    data[company_id]["messages"].append(new_msg)
    save_json(CORRESPONDENCE_FILE, data)
    return new_msg


@app.delete("/api/correspondence/{company_id}/message/{msg_id}")
def delete_correspondence_message(company_id: str, msg_id: str):
    data = load_json(CORRESPONDENCE_FILE)
    if company_id in data and "messages" in data[company_id]:
        data[company_id]["messages"] = [
            m for m in data[company_id]["messages"] if m.get("id") != msg_id
        ]
        save_json(CORRESPONDENCE_FILE, data)
    return {"status": "success"}


@app.post("/api/correspondence/{company_id}/analyze")
def analyze_correspondence_endpoint(company_id: str, lang: str = "tr"):
    data = load_json(CORRESPONDENCE_FILE)
    company_data = data.get(company_id, {"messages": [], "analysis": "", "notes": []})
    messages = company_data.get("messages", [])
    
    companies = load_json(COMPANIES_FILE)
    company = next((c for c in companies if c.get("id") == company_id), None)
    company_name = company.get("name", "Bilinmeyen Şirket") if company else "Bilinmeyen Şirket"

    analysis_result = analyze_correspondence(company_name, messages, lang)
    
    if company_id not in data:
        data[company_id] = {"messages": [], "analysis": "", "notes": []}
    data[company_id]["analysis"] = analysis_result
    save_json(CORRESPONDENCE_FILE, data)
    
    return {"analysis": analysis_result}


@app.post("/api/correspondence/{company_id}/voice-note")
def process_voice_note_endpoint(company_id: str, req: VoiceNoteRequest, lang: str = "tr"):
    import time
    data = load_json(CORRESPONDENCE_FILE)
    
    companies = load_json(COMPANIES_FILE)
    company = next((c for c in companies if c.get("id") == company_id), None)
    company_name = company.get("name", "Bilinmeyen Şirket") if company else "Bilinmeyen Şirket"

    formatted_text = format_voice_note(req.raw_transcript, company_name, lang)
    
    if company_id not in data:
        data[company_id] = {"messages": [], "analysis": "", "notes": []}
        
    for key in ["messages", "notes"]:
        if key not in data[company_id]:
            data[company_id][key] = []
            
    new_note = {
        "id": f"note_{int(time.time())}_{len(data[company_id]['notes'])}",
        "raw_transcript": req.raw_transcript,
        "formatted_text": formatted_text,
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
    
    data[company_id]["notes"].append(new_note)
    save_json(CORRESPONDENCE_FILE, data)
    
    return new_note


# Serve React static build files if they exist (production mode)
frontend_dist_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if os.path.exists(frontend_dist_path):
    app.mount("/", StaticFiles(directory=frontend_dist_path, html=True), name="static")
