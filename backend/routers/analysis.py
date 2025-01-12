from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Book
from services.groq import query_groq
from typing import List

router = APIRouter()

@router.post("/analyze/{book_id}")
async def analyze_book(book_id: int, db: Session = Depends(get_db)):
    """
    Analyze the title of a book using the Groq API.

    Args:
        book_id (int): ID of the book in the database.
        db (Session): Injected database session.

    Returns:
        dict: Result of the analysis for the book's title.
    """
    try:
        # Fetch the book from the database
        book = db.query(Book).filter(Book.id == book_id).first()
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        # Ensure the title is available
        if not book.title:
            raise HTTPException(status_code=400, detail="The book does not have a title available for analysis")

        # Send the title for analysis
        messages = [{"role": "user", "content": book.title}]
        response = await query_groq(messages)

        # Format the analysis result
        content = response.choices[0].message.content
        return {"analysis": content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing the book: {str(e)}")
