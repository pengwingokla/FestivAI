import os
import requests
from datetime import datetime
from dotenv import load_dotenv
from google import genai
from google.genai.types import HttpOptions

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
      country = data.get("country", "")
      return city, country
   except Exception as e:
      return "", ""

# === Step 2: Get weather data from OpenWeatherMap API ===
def get_weather_data(city: str, country: str):
   try:
      api_key = os.getenv("OPENWEATHER_API_KEY")
      if not api_key:
         return None
      
      # Get coordinates first
      geocode_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city},{country}&limit=1&appid={api_key}"
      geocode_response = requests.get(geocode_url)
      geocode_data = geocode_response.json()
      
      if not geocode_data:
         return None
      
      lat = geocode_data[0]["lat"]
      lon = geocode_data[0]["lon"]
      
      # Get weather data
      weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
      weather_response = requests.get(weather_url)
      weather_data = weather_response.json()
      
      return weather_data
   except Exception as e:
      return None

# === Step 3: Ask AI agent to format weather information ===
def format_weather_info(weather_data, city: str, country: str):
   if not weather_data:
      return "Unable to retrieve weather data for the specified location."
   
   prompt = (
      f"You are a weather assistant. Analyze the following weather data for {city}, {country}:\n"
      f"Temperature: {weather_data.get('main', {}).get('temp', 'N/A')}°C\n"
      f"Feels like: {weather_data.get('main', {}).get('feels_like', 'N/A')}°C\n"
      f"Humidity: {weather_data.get('main', {}).get('humidity', 'N/A')}%\n"
      f"Weather description: {weather_data.get('weather', [{}])[0].get('description', 'N/A')}\n"
      f"Wind speed: {weather_data.get('wind', {}).get('speed', 'N/A')} m/s\n"
      f"Pressure: {weather_data.get('main', {}).get('pressure', 'N/A')} hPa\n"
      f"Visibility: {weather_data.get('visibility', 'N/A')} meters\n"
      f"Sunrise: {datetime.fromtimestamp(weather_data.get('sys', {}).get('sunrise', 0)).strftime('%H:%M')}\n"
      f"Sunset: {datetime.fromtimestamp(weather_data.get('sys', {}).get('sunset', 0)).strftime('%H:%M')}\n\n"
      "Provide a friendly, informative weather summary in a conversational tone. "
      "Include recommendations for clothing or activities based on the weather conditions. "
      "Keep it concise but helpful."
   )

   response = client.models.generate_content(model=model_name, contents=[prompt])
   return response.text.strip()

def get_weather_for_location(city: str = None, country: str = None):
   """
   Main function to get weather information for a location.
   If no location is provided, it will use the user's detected location.
   """
   if not city or not country:
      city, country = get_user_location()
      if not city or not country:
         return "Unable to determine your location. Please provide a city and country."
   
   weather_data = get_weather_data(city, country)
   return format_weather_info(weather_data, city, country)