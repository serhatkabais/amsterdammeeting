import os
import json
import requests
import sys

# Get backend directory
BACKEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend")
DATA_DIR = os.path.join(BACKEND_DIR, "data")

print("=====================================================")
print("          DUTCH EDTECH - FIREBASE MIGRATION          ")
print("=====================================================")
print(f"Reading local database files from: {DATA_DIR}\n")

# Ask for configuration
firebase_url = input("Enter your Firebase Realtime Database URL (e.g. https://xxxx.firebaseio.com): ").strip()
if not firebase_url:
    print("Error: Firebase URL is required.")
    sys.exit(1)

# Strip trailing slash if present
if firebase_url.endswith("/"):
    firebase_url = firebase_url[:-1]

firebase_secret = input("Enter your Firebase Database Secret key (press Enter if database is public): ").strip()

data_files = [
    "companies_data.json",
    "rag_store.json",
    "strategy_reports.json",
    "tracker_data.json",
    "correspondence_data.json"
]

print("\nStarting upload...")

for filename in data_files:
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        print(f"[-] Skipping {filename}: File not found locally.")
        continue
        
    print(f"[+] Uploading {filename}...")
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        collection_name = filename.replace(".json", "")
        url = f"{firebase_url}/{collection_name}.json"
        if firebase_secret:
            url += f"?auth={firebase_secret}"
            
        response = requests.put(url, json=data, timeout=15)
        if response.status_code == 200:
            print(f"[✓] Successfully uploaded {filename}!")
        else:
            print(f"[X] Failed to upload {filename}. Status Code: {response.status_code}. Response: {response.text}")
    except Exception as e:
        print(f"[X] Error uploading {filename}: {e}")

print("\nMigration finished!")
print("=====================================================")
print("Please define the following environment variables in Vercel settings:")
print(f"1. FIREBASE_URL = {firebase_url}")
if firebase_secret:
    print(f"2. FIREBASE_SECRET = [Your secret key]")
else:
    print("2. FIREBASE_SECRET = (Not needed since database is public)")
print("=====================================================")
