from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sub_agents import *
from models import FlightRequest, FlightOption, FlightResponseDict
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://10.4.33.184:8080"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/find-flights/{to_city}", response_model=FlightResponseDict)
def find_flights_get(to_city: str):
    from sub_agents import flight_agent

    from_city, from_country = flight_agent.get_user_location()
    if not from_city:
        return []

    url = flight_agent.get_flight_url(from_city, to_city)
    raw_data = flight_agent.scrape_website_data(url)

    if not raw_data:
        return []

    genai_response = flight_agent.find_best_flight(raw_data, from_city, from_country, to_city)
    print("AI Response:", genai_response)

    try:
        return json.loads(genai_response)
    except:
        print("Error parsing AI response.")
        return []

