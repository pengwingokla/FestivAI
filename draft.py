def summarize_flights(flight_data, from_city, from_country, to_city):
    prompt = (
        f"Given flight ticket data from Google Flights page:\n"
        f"{chr(10).join(f'- {flight}' for flight in flight_data)}\n\n"
        f"Find the top 3 cheapest one-way flight tickets from {from_city} ({from_country}) to {to_city} on {get_date()}.\n"
        f"Include airline, price, duration, and departure date.\n"
        f"Respond in JSON format like: "
        f"[{{'airline': ..., 'price': ..., 'duration': ..., 'departure': ...}}, ...]"
    )
    response = client.models.generate_content(model=model_name, contents=[prompt])
    return response.text