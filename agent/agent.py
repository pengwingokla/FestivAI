from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool


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
    Hi
    """,
    output_key="seminal_paper",
    # tools=[
    #     AgentTool(agent=academic_websearch_agent),
    #     AgentTool(agent=academic_newresearch_agent),
    # ],
)

root_agent = academic_coordinator