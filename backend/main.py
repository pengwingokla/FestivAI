from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sub_agents import *
from models import FlightRequest, FlightOption
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://10.4.33.184:8080"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/find-flights", response_model=list[FlightOption])
def find_flights(req: FlightRequest):
    from_city, from_country = flight_agent.get_user_location()
    if not from_city:
        return []

    url = flight_agent.get_flight_url(from_city, req.to_city)
    raw_data = flight_agent.scrape_website_data(url)

    if not raw_data:
        return []

    genai_response = flight_agent.find_best_flight(raw_data, from_city, from_country, req.to_city)

    try:
        parsed = json.loads(genai_response)
        return parsed
    except Exception:
        print("⚠️ Failed to parse model output:", genai_response)
        return []
