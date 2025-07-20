import os
import requests
from datetime import datetime
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from urllib.parse import quote_plus
from google import genai
from google.genai.types import HttpOptions
from dateutil.relativedelta import relativedelta

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
cloud_run_url = os.getenv("CLOUD_RUN_URL")
model_name = os.getenv("AGENT_MODEL")

client = genai.Client(api_key=api_key, http_options=HttpOptions(base_url=cloud_run_url))

# === Step 1: Detect user location based on IP ===
def get_user_location():
   try:
      response = requests.get("https://ipinfo.io/json")
      data = response.json()
      city = data.get("city", "")
      region = data.get("region", "")
      country = data.get("country", "")
      return city, region, country
   except Exception as e:
      return "", "", ""

def get_date(offset: int = 0):
   return (datetime.now() + relativedelta(months=offset)).strftime("%Y-%m-%d")

# === Step 2: Generate Google Flights URL ===
def get_flight_url(from_city: str, from_state: str, to_city: str):
   date = get_date()
   return f"https://www.google.com/travel/flights?q=oneway%20flights%20from%20{quote_plus(from_city)}%20{quote_plus(from_state)}%20to%20{quote_plus(to_city)}%20on%20{date}"

# === Step 3: Scrape flight data from Google Flights ===
def scrape_website_data(url):
   try:
      response = requests.get(url, timeout=10)
      response.raise_for_status()
      soup = BeautifulSoup(response.text, 'html.parser')
      heading_tag = soup.find('h3', string='Top flights')

      if not heading_tag:
         return []
        
      ul_element = heading_tag.find_next_sibling('ul')
      if not ul_element:
         return []
        
      flight_info = [li.get_text(separator=' ', strip=True) for li in ul_element.find_all('li')]
      return flight_info
   except:
      return []

# === Step 4: Ask AI agent to extract ticket info ===
def find_best_flight(flight_data, from_city: str, from_country, to_city: str):
   # url = get_flight_url(from_city, to_city)
   # print(f"\n🌐 Searching: {url}\n")

   prompt = (
      "You are a travel assistant. Analyze the following flight ticket data from a Google Flights page:\n"
      + "\n".join(f"- {flight}" for flight in flight_data)
      + f"\n\nFind the top 3 cheapest flight tickets from {from_city}, {from_country} to {to_city} on {get_date()}.\n"
      "Respond in **pure JSON object format** with keys flight_1, flight_2, and flight_3.\n"
      "Each key should map to an object with airline, price, duration, and departure.\n"
      "Example:\n"
      '{\n'
      '  "flight_1": {"airline": "Vietnam Airlines", "price": "$900", "duration": "26 hr 15 min", "departure": "Sat, Sep 20, 11:25 AM"},\n'
      '  "flight_2": {...},\n'
      '  "flight_3": {...}\n'
      '}\n'
      "Do not include markdown, triple backticks, or any explanatory text—return only the JSON object."
   )

   response = client.models.generate_content(model=model_name, contents=[prompt])
   clean = response.text.replace("```json", "").replace("```", "").strip()
   return clean
