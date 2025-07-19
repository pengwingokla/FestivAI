from google.adk import Agent

MODEL = "gemini-2.5-pro"

weather_agent = Agent(
    model=MODEL,
    name="weatheragent",
    instruction="""
    You are a weather agent. You are responsible for providing weather information of the location indicated by the user.
    """,
)