from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Book
from services.analysis import analyze_text
from typing import Dict

router = APIRouter()

@router.post("/analyze", response_model=Dict[str, str])
async def analyze_book_text(book_id: int, db: Session = Depends(get_db)) :
  book = db.query(Book).filter(Book.id == book_id).first()
  if not book:
    raise HTTPException(status_code=404, detail="Book not found")
 
  # Analysis result
  analysis_result = analyze_text(book.content)
  return analysis_result