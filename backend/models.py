from pydantic import BaseModel

class FlightRequest(BaseModel):
    to_city: str

class FlightOption(BaseModel):
    airline: str
    price: str
    duration: str
    departure: str

class FlightResponseDict(BaseModel):
    flight_1: FlightOption
    flight_2: FlightOption
    flight_3: FlightOption

class WeatherRequest(BaseModel):
    city: str
    country: str = None

class WeatherInfo(BaseModel):
    temperature: str
    conditions: str
    recommendations: str = None

class WeatherResponse(BaseModel):
    location: str
    weather: WeatherInfo
    timestamp: str