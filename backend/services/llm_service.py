import os
import json
import requests

# Helper to read environment variables from a local .env file
def load_env_file(filepath=".env"):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip()

# Load env variables from backend directory or root
load_env_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def generate_outreach_email(
    company_name: str,
    company_focus: str,
    why_recommended: str,
    company_location: str,
    scraped_text: str,
    rag_data: dict,
    custom_notes: str = ""
) -> str:
    """
    Calls OpenRouter API to generate a realistic, warm, B1-B2 level English email.
    """
    if not OPENROUTER_API_KEY:
        return "Error: OpenRouter API key not configured in backend/.env file."

    # Extract profiles
    serhat = rag_data.get("serhat_kabais", {})
    duygu = rag_data.get("duygu_kabais", {})

    system_prompt = f"""You are a professional assistant helping Serhat Kabaiş and Duygu Kabaiş write a warm, realistic, and highly concise cold email to a Dutch EdTech company. Do NOT mention Zafer Karadayı, Nara, or Nara XR in the email under any circumstances.

Here is the complete RAG profile data for both individuals and their goals:
{json.dumps(rag_data, ensure_ascii=False, indent=2)}

Email rules (CRITICAL FOR QUALITY):
1. **Strict Brevity:** Keep the email extremely short and direct. Maximum 3 paragraphs, total word count must be between 100 and 130 words.
2. **Simplified Info:** Do NOT list multiple projects. Mention ONLY one relevant connection (e.g., if targeting an illustration-heavy company, focus on Duygu's visual pedagogy and 100+ books; if targeting AI/VR, focus on Serhat's EdTech/VR/Maker work).
3. **Realistic & Natural Tone:** Avoid corporate buzzwords, excessive compliments, or sales pitch language. The tone must be friendly and authentic. Do NOT sound like you have been closely tracking or obsessing over their company. Keep the connection more superficial and casual (e.g., use phrases similar to "While researching the Dutch EdTech ecosystem, I came across your work and noticed...").
4. **B1 English Level (Imperfect & Authentic):** Use B1 English primarily, with occasional B2 words. CRITICAL: The English should NOT be perfect or sound like a native speaker/AI. It must sound like an authentic non-native speaker who communicates well but makes minor natural phrasing imperfections. Do not use flawless grammar or advanced vocabulary, so expectations match reality when they meet face-to-face.
5. **Call to Action:** Ask for a brief, casual coffee meeting during their upcoming trip (16-30 July) to chat about EdTech and possible creative collaborations. Do not specify an exact duration (like 15 minutes). **IMPORTANT LOCATION RULE:** The company is located in {company_location}. If they are in Amsterdam, only suggest meeting in "Amsterdam". If they are in Utrecht, suggest meeting in "Amsterdam or Utrecht". If they are in any other city, you can suggest "Amsterdam or {company_location}".
"""

    user_prompt = f"""Write an outreach email to the following company:
- Company Name: {company_name}
- Focus Area: {company_focus}
- Location: {company_location}
- Why we target them: {why_recommended}
"""
    if custom_notes:
        user_prompt += f"\n- Special Instructions/Focus for this draft (CRITICAL: You MUST strictly incorporate these requests/points in the email): {custom_notes}\n"

    user_prompt += f"""
Below is the text crawled from their website for context (use this to mention a specific alignment, if relevant):
--- START OF WEBSITE TEXT ---
{scraped_text[:2000]}
--- END OF WEBSITE TEXT ---

Format the output as a clean, ready-to-copy email body (with a subject line at the top).
Always end the email with the following exact signature:
Serhat KABAİŞ
Duygu GEZER
edumanu.com
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Dutch EdTech Outreach Portal"
    }

    payload = {
        "model": "google/gemini-3.1-flash-lite",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=25
        )
        if response.status_code != 200:
            return f"Error: OpenRouter API returned code {response.status_code}. Detail: {response.text}"
        
        result_json = response.json()
        choices = result_json.get("choices", [])
        if choices:
            return choices[0].get("message", {}).get("content", "Error: Empty content from model.")
        return "Error: No choices in response."
    except Exception as e:
        return f"Error occurred during LLM call: {str(e)}"

def generate_reply_draft(
    company_name: str,
    messages: list,
    rag_data: dict,
    custom_notes: str = ""
) -> str:
    """
    Calls OpenRouter API to generate a realistic, warm, B1 level English reply draft based on previous correspondence.
    """
    if not OPENROUTER_API_KEY:
        return "Error: OpenRouter API key not configured in backend/.env file."

    # Format the message history
    history_text = ""
    for msg in sorted(messages, key=lambda x: x.get("date", "")):
        sender = "Serhat/Duygu (Us)" if msg.get("type") == "sent" else f"{company_name} (Them)"
        history_text += f"--- {sender} on {msg.get('date', 'Unknown Date')} ---\n{msg.get('content', '')}\n\n"

    system_prompt = f"""You are a professional assistant helping Serhat Kabaiş and Duygu Kabaiş write a warm, realistic, and highly concise reply to a Dutch EdTech company. Do NOT mention Zafer Karadayı, Nara, or Nara XR in the email under any circumstances.

Here is the complete RAG profile data for both individuals and their goals:
{json.dumps(rag_data, ensure_ascii=False, indent=2)}

Reply rules (CRITICAL FOR QUALITY):
1. **Context-Aware:** Read the previous conversation history and directly address what the company asked or said in their last message.
2. **Strict Brevity:** Keep the reply extremely short and direct. Maximum 2-3 paragraphs.
3. **Realistic & Natural Tone:** Avoid corporate buzzwords, excessive compliments, or sales pitch language. The tone must be friendly and authentic.
4. **B1 English Level (Imperfect & Authentic):** Use B1 English primarily, with occasional B2 words. CRITICAL: The English should NOT be perfect or sound like a native speaker/AI. It must sound like an authentic non-native speaker who communicates well but makes minor natural phrasing imperfections.
"""

    user_prompt = f"""Write a reply email for the following company:
- Company Name: {company_name}

Here is the conversation history so far:
{history_text}
"""
    if custom_notes:
        user_prompt += f"\n- Special Instructions/Focus for this reply (CRITICAL: You MUST strictly incorporate these requests/points in the email): {custom_notes}\n"

    user_prompt += f"""
Format the output as a clean, ready-to-copy email body. Do not include subject lines unless necessary (like "Re: ...").
Always end the email with the following exact signature:
Serhat KABAİŞ
Duygu GEZER
edumanu.com
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "google/gemini-3.1-flash-lite",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=25
        )
        if response.status_code != 200:
            return f"Error: OpenRouter API returned code {response.status_code}. Detail: {response.text}"
        
        result_json = response.json()
        choices = result_json.get("choices", [])
        if choices:
            return choices[0].get("message", {}).get("content", "Error: Empty content from model.")
        return "Error: No choices in response."
    except Exception as e:
        return f"Error occurred during LLM call: {str(e)}"

def generate_strategy_report(
    company_name: str,
    company_focus: str,
    why_recommended: str,
    scraped_text: str,
    rag_data: dict
) -> str:
    """
    Calls OpenRouter API to generate a strategic preparation report in Turkish.
    """
    if not OPENROUTER_API_KEY:
        return "Hata: OpenRouter API key .env dosyasında bulunamadı."

    serhat = rag_data.get("serhat_kabais", {})
    duygu = rag_data.get("duygu_kabais", {})

    system_prompt = f"""Sen Serhat Kabaiş, Duygu Kabaiş ve Zafer Karadayı'ya (Nara XR) Hollanda'daki EdTech firmalarıyla yapacakları toplantılar için stratejik danışmanlık yapan profesyonel bir asistansın.

Aşağıda Serhat, Duygu ve Hollanda seyahati/iş birliği hedeflerine dair güncel RAG (Retrieval-Augmented Generation) profili yer almaktadır:
{json.dumps(rag_data, ensure_ascii=False, indent=2)}

Görevin: Aşağıda bilgileri verilen firma ile yapılacak olası bir toplantı için, Serhat ve Duygu'nun profillerini firmanın ihtiyaçlarıyla eşleştirerek DETAYLI, UYGULANABİLİR ve STRATEJİK bir "Görüşme Hazırlık Raporu" (Türkçe) hazırlamak.

Rapor Formatı (Markdown kullan):
1. **Firma Hakkında Kısa Özet (Briefing):** Firmanın ne yaptığı, odak noktası (verilen web sitesi tarama metninden faydalan).
2. **Öne Çıkarılması Gereken Yetenekler:** Firmanın yapısına göre Serhat'ın mı (AI, Pedagoji), Duygu'nun mu (Görsel Pedagoji) yoksa Zafer'in mi (Nara XR, B2B VR Simülasyon, MetaQampus) hangi spesifik yetenekleri vurgulanmalı? Neden?
3. **Potansiyel İş Birliği Alanları:** Bu firma ile somut olarak ne tür projeler yapılabilir? "Uçtan uca çözüm" kapasitelerini (donanım+yazılım+görsel) nasıl kullanabilirler?
4. **Görüşme Tüyoları (Tips):** Toplantıda hangi anahtar kelimeler kullanılmalı? Hangi pedagojik (örn. Connectivism) veya tasarım trendlerinden bahsedilmeli? Nelerden kaçınılmalı?
5. **Sorulabilecek Stratejik 2 Soru:** Toplantıda firmaya sorulabilecek, onların vizyonunu ve iş birliğine açıklığını ölçecek akıllıca 2 soru.

Kurallar:
- Dil kesinlikle Türkçe olmalı.
- Profesyonel, vizyoner ama pratik bir dil kullan.
- Verilen kazınmış web sitesi metnindeki güncel projeleri veya firmanın kültürünü analiz edip rapora yedir.
"""

    user_prompt = f"""Firma Adı: {company_name}
Odak Alanı: {company_focus}
Neden Önerildiği: {why_recommended}

Web Sitesinden Kazınan Metin:
--- BAŞLANGIÇ ---
{scraped_text[:3000]}
--- BİTİŞ ---

Lütfen strateji raporunu Markdown formatında oluştur.
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Dutch EdTech Outreach Portal"
    }

    payload = {
        "model": "google/gemini-3.1-flash-lite",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )
        if response.status_code != 200:
            return f"API Hatası ({response.status_code}): {response.text}"
        
        result_json = response.json()
        choices = result_json.get("choices", [])
        if choices:
            return choices[0].get("message", {}).get("content", "Hata: Modelden içerik dönmedi.")
        return "Hata: Yanıtta seçenek bulunamadı."
    except Exception as e:
        return f"LLM çağrısı sırasında hata oluştu: {str(e)}"

def chat_interview(
    company_name: str,
    company_focus: str,
    rag_data: dict,
    chat_history: list
) -> str:
    """
    Simulates a virtual interview chat using Gemini-2.5-flash.
    """
    if not OPENROUTER_API_KEY:
        return "Error: OpenRouter API key missing."

    serhat = rag_data.get("serhat_kabais", {})
    duygu = rag_data.get("duygu_kabais", {})

    # Constructing a brief summary to represent the cold email context
    email_summary = f"""We received a brief cold email from two professionals looking to connect during their visit to the Netherlands (July 16-30):
- Serhat Kabais: 22+ years English Teacher, MA in EdTech. Focuses on AI integration, VR (developed VR bike 'Sanal Pedal'), and maker/hardware projects.
- Duygu Kabais: Children's book illustrator & designer with 100+ published books, focusing on UI/UX and visual pedagogy.
They offered a potential end-to-end collaboration combining their hardware/pedagogy and illustration skills."""

    system_prompt = f"""You are a representative/executive at {company_name}, a Dutch EdTech company focusing on {company_focus}.
You recently received the following cold email context:
{email_summary}

You have agreed to a brief virtual chat. 
CRITICAL RULES:
1. Speak exclusively in English.
2. Be conversational, natural, and realistic. Do not sound like an AI assistant. You are a busy Dutch executive.
3. Keep responses VERY short (1-3 sentences maximum). This is a fast-paced voice chat.
4. Base your questions and interests on how their skills might actually fit your specific company ({company_name}).
5. Wait for them to introduce themselves or drive the conversation if they just say hello. Do not monologue.
"""

    # Convert frontend chat history to OpenRouter format
    # Frontend format: [{"role": "user", "content": "..."}, {"role": "ai", "content": "..."}]
    formatted_messages = [{"role": "system", "content": system_prompt}]
    
    for msg in chat_history:
        role = "assistant" if msg.get("role") == "ai" else "user"
        formatted_messages.append({"role": role, "content": msg.get("content", "")})

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Dutch EdTech Outreach Portal"
    }

    payload = {
        "model": "google/gemini-3.1-flash-lite",
        "messages": formatted_messages,
        "temperature": 0.6
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=15
        )
        if response.status_code != 200:
            return f"Error ({response.status_code}): {response.text}"
        
        result_json = response.json()
        choices = result_json.get("choices", [])
        if choices:
            return choices[0].get("message", {}).get("content", "Error: Empty content.")
        return "Error: No choices."
    except Exception as e:
        return f"LLM error: {str(e)}"

def analyze_correspondence(
    company_name: str,
    messages: list,
    lang: str = 'tr'
) -> dict:
    """
    Calls OpenRouter API to analyze correspondence with a company.
    Returns a dict with 'status_summary', 'meeting_date', and 'analysis_markdown'.
    """
    if not messages:
        if lang == 'tr':
            return {"status_summary": "İletişim Yok", "meeting_date": "", "analysis_markdown": "Henüz analiz edilecek yazışma bulunmuyor."}
        return {"status_summary": "No Contact", "meeting_date": "", "analysis_markdown": "No correspondence to analyze yet."}

    if not OPENROUTER_API_KEY:
        err = "Hata: OpenRouter API key .env dosyasında bulunamadı." if lang == 'tr' else "Error: OpenRouter API key not configured."
        return {"status_summary": "Hata", "meeting_date": "", "analysis_markdown": err}

    language = "Türkçe" if lang == 'tr' else "English"

    messages_text = "\n".join([
        f"[{m.get('date', 'N/A')}] ({m.get('type', 'unknown').upper()}): {m.get('content', '')}"
        for m in messages
    ])

    system_prompt = f"""You are a professional communication analyst. Analyze the following email/message correspondence with the company "{company_name}".

You MUST return your response as a valid JSON object EXACTLY matching this structure (no markdown fences around the JSON):
{{
  "status_summary": "A short 3-6 word summary (e.g. 'Mail Gönderildi', 'Olumlu - Görüşme Planlandı', 'Görüşme Tamamlandı - Olumsuz')",
  "meeting_date": "YYYY-MM-DD if a meeting date in 2026 is mentioned, otherwise empty string",
  "dashboard_summary": "A concise 1-2 sentence summary of the latest status, suitable for displaying on a dashboard card.",
  "analysis_markdown": "Your detailed analysis in {language} with these sections: 1. İlgi Düzeyi, 2. Ton Analizi, 3. Sonraki Adımlar, 4. Genel Durum"
}}"""

    user_prompt = f"""Company: {company_name}

Correspondence:
{messages_text}

Please analyze this correspondence and output strictly JSON."""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Dutch EdTech Outreach Portal"
    }

    payload = {
        "model": "google/gemini-3.1-flash-lite",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.3,
        "response_format": {"type": "json_object"}
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=25
        )
        if response.status_code != 200:
            return {"status_summary": "API Hatası", "meeting_date": "", "analysis_markdown": f"API Hatası ({response.status_code}): {response.text}"}

        result_json = response.json()
        choices = result_json.get("choices", [])
        if choices:
            content = choices[0].get("message", {}).get("content", "{}")
            # Gemini might still wrap in ```json ... ```
            content = content.replace("```json", "").replace("```", "").strip()
            return json.loads(content)
        return {"status_summary": "Hata", "meeting_date": "", "analysis_markdown": "Hata: Yanıtta seçenek bulunamadı."}
    except Exception as e:
        return {"status_summary": "Hata", "meeting_date": "", "analysis_markdown": f"LLM çağrısı sırasında hata oluştu: {str(e)}"}

def format_voice_note(
    raw_transcript: str,
    company_name: str,
    lang: str = 'tr'
) -> str:
    """
    Calls OpenRouter API to clean up and format a raw voice transcript into organized notes.
    """
    if not OPENROUTER_API_KEY:
        return "Hata: OpenRouter API key .env dosyasında bulunamadı." if lang == 'tr' else "Error: OpenRouter API key not configured."

    language = "Türkçe" if lang == 'tr' else "English"

    system_prompt = f"You are a note formatter. Take this raw voice transcript about {company_name} and format it into clean, organized notes in {language}. Fix grammar, remove filler words, organize by topics with headers."

    user_prompt = f"""Raw voice transcript:
{raw_transcript}

Please format this into clean, organized notes."""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Dutch EdTech Outreach Portal"
    }

    payload = {
        "model": "google/gemini-3.1-flash-lite",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.4
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=25
        )
        if response.status_code != 200:
            return f"API Hatası ({response.status_code}): {response.text}"

        result_json = response.json()
        choices = result_json.get("choices", [])
        if choices:
            return choices[0].get("message", {}).get("content", "Hata: Modelden içerik dönmedi.")
        return "Hata: Yanıtta seçenek bulunamadı."
    except Exception as e:
        return f"LLM çağrısı sırasında hata oluştu: {str(e)}"
