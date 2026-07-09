import re
import requests
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.recording = True
        self.text_content = []
        self.ignore_tags = {"script", "style", "nav", "footer", "head", "title", "meta", "link"}

    def handle_starttag(self, tag, attrs):
        if tag.lower() in self.ignore_tags:
            self.recording = False

    def handle_endtag(self, tag):
        if tag.lower() in self.ignore_tags:
            self.recording = True

    def handle_data(self, data):
        if self.recording:
            cleaned = data.strip()
            if cleaned:
                self.text_content.append(cleaned)

    def get_text(self):
        return "\n".join(self.text_content)

def scrape_website_text(url: str) -> str:
    """
    Fetches the website URL, extracts text from HTML using built-in HTMLParser.
    Cleans up whitespace and returns the text.
    """
    if not url.startswith("http"):
        url = "https://" + url
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return f"Error: Received status code {response.status_code}"
        
        html_content = response.text
        parser = TextExtractor()
        parser.feed(html_content)
        text = parser.get_text()
        
        # Simple cleanup: replace multiple newlines/spaces
        text = re.sub(r'\n+', '\n', text)
        text = re.sub(r' +', ' ', text)
        
        # Limit length to 3000 words to avoid overloading context
        words = text.split()
        if len(words) > 3000:
            text = " ".join(words[:3000]) + "..."
            
        return text
    except Exception as e:
        return f"Error occurred during scraping: {str(e)}"

# Simple cache dictionary to avoid repeated scraping
_scraping_cache = {}

def get_scraped_company_text(company_id: str, url: str, force_refresh: bool = False) -> str:
    if force_refresh or company_id not in _scraping_cache:
        text = scrape_website_text(url)
        _scraping_cache[company_id] = text
    return _scraping_cache[company_id]
