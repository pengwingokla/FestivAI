from pydantic import BaseModel

class FlightRequest(BaseModel):
    to_city: str

class FlightOption(BaseModel):
    airline: str
    price: str
    duration: str
    departure: str
