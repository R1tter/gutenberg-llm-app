import asyncio
import httpx
import os
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not configured in .env")

headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json",
}

async def query_groq(messages: list[dict], model: str = "llama-3.3-70b-versatile", retries: int = 3) -> dict:
    """
    Make a request to the Groq API.

    Args:
        messages (list[dict]): Messages in the format [{"role":"user","content":"Text"}].
        model (str): The Groq model to be used (default: "llama-3.3-70b-versatile").
        retries (int): Number of retry attempts in case of rate limits.

    Returns:
        dict: Groq API response.
    """
    payload = {
        "model": model,
        "messages": messages,
    }

    for attempt in range(retries):
        async with httpx.AsyncClient(timeout=60) as client:  # Define timeout of 60 seconds
            response = await client.post(GROQ_API_URL, json=payload, headers=headers)

            if response.status_code == 200:
                return response.json()
            elif response.status_code == 429:  # Rate limit exceeded
                retry_after = response.headers.get("Retry-After")  # Default to 0.5s if header missing
                if not retry_after:
                  await asyncio.sleep(float(retry_after))
                else:
                  await asyncio.sleep(0.5)
            else:
                raise ValueError(f"Error {response.status_code}: {response.text}")
            
    # If we exhaust retries
    raise ValueError("Exceeded maximum retries due to rate limit or other errors.")