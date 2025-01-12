from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv()

# Configure the Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def query_groq(
    messages: list[dict],
    model: str = "llama-3.3-70b-versatile",
    stream: bool = False,
) -> dict:
    """
    Query the Groq API using the official client.

    Args:
        messages (list[dict]): List of messages in the format [{"role": "user", "content": "Text"}].
        model (str): Groq model to use (default: "llama-3.3-70b-versatile").
        stream (bool): Enable streaming mode if True (default: False).

    Returns:
        dict: Response from the Groq API.

    Raises:
        ValueError: If there are issues with the request or response.
    """
    if not messages or not isinstance(messages, list):
        raise ValueError("Messages must be a non-empty list of dictionaries.")

    try:
        # Send the request to the Groq API
        response = client.chat.completions.create(
            messages=messages,
            model=model,
            stream=stream,
        )

        # Return the response
        return response

    except Exception as e:
        print(f"Error querying the Groq API: {e}")
        raise ValueError(f"Error querying the Groq API: {str(e)}")
