from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool

from .sub_agents.weather_agent import weather_agent

MODEL = "gemini-2.5-pro"


academic_coordinator = LlmAgent(
    name="academic_coordinator",
    model=MODEL,
    description=(
        "analyzing seminal papers provided by the users, "
        "providing research advice, locating current papers "
        "relevant to the seminal paper, generating suggestions "
        "for new research directions, and accessing web resources "
        "to acquire knowledge"
    ),
    instruction="""
    You are a helpful assistant that can answer questions and help with suggesting festivals happening in the world.
    You can also use the tools provided to you to help you answer the question or complete the task.
    You can also use the web to answer the question or complete the task.
    """,
    output_key="seminal_paper",
    tools=[
        AgentTool(agent=weather_agent),
    ],
)

root_agent = academic_coordinator