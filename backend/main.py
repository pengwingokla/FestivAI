from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sub_agents import *
from models import FlightRequest, FlightOption, FlightResponseDict, WeatherRequest, WeatherResponse, WeatherInfo
import json
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/find-flights/{to_city}", response_model=FlightResponseDict)
def find_flights_get(to_city: str):
    from_city, from_state, from_country = flight_agent.get_user_location()
    if not from_city:
        return []

    url = flight_agent.get_flight_url(from_city, from_state, to_city)
    raw_data = flight_agent.scrape_website_data(url)

    if not raw_data:
        return []

    genai_response = flight_agent.find_best_flight(raw_data, from_city, from_country, to_city)

    try:
        return json.loads(genai_response)
    except:
        print("Error parsing AI response.")
        return []
    
@app.get("/api/get-flights-full-response/{to_city}")
def get_flights_full_response(to_city: str):
    # Detect user location
    from_city, from_state, from_country = flight_agent.get_user_location()
    if not from_city:
        return {"response": "Sorry, I couldn't detect your location."}

    cheapest_flights = find_flights_get(to_city)
    if not cheapest_flights:
        return {"response": f"Sorry, I couldn't find any flights to {to_city} right now."}

    # Format the summary
    if from_state:
        from_location = f"{from_city}, {from_state}"
    lines = [
        f"🛫 Here are the best flights from {from_location} to {to_city} for around {flight_agent.get_date()}:"
    ]

    for i, (key, flight) in enumerate(cheapest_flights.items(), 1):
        lines.append(
            f"{i}. {flight['airline']} | {flight['price']} | {flight['duration']} | Depart: {flight['departure']}"
        )

    lines.append("\n✈️ Let me know if you'd like help booking, or want to compare return flights too!")

    return {"response": "\n".join(lines)}
    

@app.get("/api/get-weather/{city}", response_model=WeatherResponse)
def get_weather(city: str):
    # Get weather information
    weather_info = weather_agent.get_weather_for_location(city)
    print("Weather Response:", weather_info)

    # Create a structured response that matches WeatherResponse model
    response_data = {
        "location": f"{city}",
        "weather": WeatherInfo(**weather_info),  # Convert dict to WeatherInfo object
        "timestamp": datetime.now().isoformat()
    }

    return response_data

@app.get("/api/get-weather-full-response/{city}")
def get_weather_full_response(city: str):
    weather_info = get_weather(city)

    # Format a textual summary
    lines = [f"🌍 Weather for {weather_info['location']}:"]
    lines.append(f"🌡️ Temperature: {weather_info['weather'].temperature}")
    lines.append(f"📝 Conditions: {weather_info['weather'].conditions}")
    lines.append(f"📝 Recommendations: {weather_info['weather'].recommendations}")

    return {"response": "\n".join(lines)}