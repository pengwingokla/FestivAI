import os
from dotenv import load_dotenv
from google.adk import Agent
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types
import json
import asyncio

load_dotenv()

# === Agentic Weather Assistant Configuration ===
MODEL = os.getenv("AGENT_MODEL", "gemini-2.0-flash-exp")

weather_agent = Agent(
    model=MODEL,
    name="weather_agent",
    instruction="""
You are a weather assistant. When I give you a city name, provide current weather information for that city and respond _only_ with a JSON object that has exactly these keys:
{
  "temperature": "temperature with unit (e.g., '22°C' or '72°F')",
  "conditions": "brief weather description (e.g., 'Sunny', 'Partly cloudy', 'Rainy')",
  "recommendations": "brief clothing or activity recommendations based on weather"
}
Do not wrap it in markdown code blocks. Return only valid JSON without any additional text or formatting.
"""
)

# Setup session service and runner
_session_service = InMemorySessionService()
_runner = Runner(
    agent=weather_agent,
    app_name="weather_agent_app",
    session_service=_session_service,
)

def _ensure_session(user_id: str, session_id: str):
    import concurrent.futures
    
    def create_session():
        return asyncio.run(
            _session_service.create_session(
                app_name="weather_agent_app",
                user_id=user_id,
                session_id=session_id,
            )
        )
    
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(create_session)
        future.result()

def get_weather_for_location(city: str):
    content = types.Content(parts=[types.Part(text=f"Get current weather for {city}")])
    
    session_id = f"weather_{city}"
    user_id = "weather_user"
    _ensure_session(user_id, session_id)
    
    events = _runner.run(user_id=user_id, session_id=session_id, new_message=content)
    
    for ev in events:
        if ev.is_final_response():
            text = ev.content.parts[0].text.strip()
            print(f"Agent response: '{text}'")  # Debug print
            
            if not text:
                print("Empty response from agent")
                return {
                    "temperature": "20°C",
                    "conditions": "Unknown",
                    "recommendations": "Check local weather"
                }
            
            # Remove markdown code blocks if present
            if text.startswith('```json'):
                text = text.replace('```json', '').replace('```', '')
            elif text.startswith('```'):
                text = text.replace('```', '').strip()
            
            return json.loads(text)
    
    # No final response found
    print("No final response from agent")
    return {
        "temperature": "20°C",
        "conditions": "Unknown",
        "humidity": "50%",
        "uv_index": "5",
        "air_quality": "Good",
        "recommendations": "Check local weather"
    }