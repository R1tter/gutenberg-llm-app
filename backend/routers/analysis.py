from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Book
from services.groq import query_groq
from typing import List

router = APIRouter()

MAX_TEXT_LENGTH = 3000  # Character limit for the Groq API

def split_text(text: str, max_length: int) -> List[str]:
    """
    Splits the text into smaller parts respecting the maximum length.

    Args:
        text (str): The text to be split.
        max_length (int): The maximum length of each part.

    Returns:
        List[str]: A list of text parts.
    """
    words = text.split()
    chunks = []
    current_chunk = []

    for word in words:
        # Verify if the next word exceeds the current chunk length
        if len(' '.join(current_chunk + [word])) <= max_length:
            current_chunk.append(word)
        else:
            # Add the current chunk to the list of chunks and start over
            chunks.append(' '.join(current_chunk))
            current_chunk = [word]
    # Add the last chunk if it's not empty
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    return chunks

@router.post("/analyze/{book_id}")
async def analyze_book(book_id: int, db: Session = Depends(get_db)):
    """
    Analyzes the content of a book using the Groq API.

    Args:
        book_id (int): ID of the book in the database.
        db (Session): Injected database session.

    Returns:
        dict: Result of the book analysis.
    """
    try:
        # Fetch the book from the database
        book = db.query(Book).filter(Book.id == book_id).first()
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        # Split the book content if it exceeds the maximum length
        parts = split_text(book.content, MAX_TEXT_LENGTH)

        # Analyze each part using the Groq API
        results = [await query_groq([{"role": "user", "content": part}]) for part in parts]

        # Initialize combined results
        combined_results = {
            "summary": [],
            "key_characters": [],
            "language": "Unknown",
            "sentiment": "Neutral",
        }

        # Combine the results
        for result in results:
            combined_results["summary"].append(result.get("summary", ""))
            combined_results["key_characters"].extend(result.get("key_characters", []))
            combined_results["language"] = result.get("language", "Unknown")
            if not combined_results["sentiment"]:
                combined_results["sentiment"] = result.get("sentiment", "Neutral")

        # Return combined results
        return {
            "summary": " ".join(combined_results["summary"]),
            "key_characters": combined_results["key_characters"],
            "language": combined_results["language"] or "Unknown",
            "sentiment": combined_results["sentiment"] or "Neutral",
        }

    except ValueError as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing the book: {str(e)}")