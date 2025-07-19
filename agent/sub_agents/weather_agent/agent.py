from google.adk import Agent

from . import prompt

MODEL = "gemini-2.5-pro"

weatheragent = Agent(
    model=MODEL,
    name="weatheragent",
    instruction=prompt.ACADEMIC_NEWRESEARCH_PROMPT,
)