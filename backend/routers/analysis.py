from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Book
from services.analysis import analyze_text
from typing import Dict

router = APIRouter()

@router.post("/analyze/{book_id}", response_model=Dict)
async def analyze_book_text(book_id: int, db: Session = Depends(get_db)) :
  book = db.query(Book).filter(Book.id == book_id).first()
  if not book:
    raise HTTPException(status_code=404, detail="Book not found")
  
  # Analysis result
  characters = identify_characters(book.content)
  language = detect_language(book.content)
  summary = summarize_plot(book.content)

  return {
    "summary": summary,
    "characters": characters,
    "language": language,
  }