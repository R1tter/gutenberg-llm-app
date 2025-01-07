from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Book
from typing import Dict
import httpx
import os

router = APIRouter()

GROQ_API_URL = "https://api.groq.com/analyze" # temporary, verify documentation for the correct URL
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@router.post("/analyze/{book_id}")
async def analyze_book(book_id: int, db: Session = Depends(get_db)) :
  book = db.query(Book).filter(Book.id == book_id).first()
  if not book:
    raise HTTPException(status_code=404, detail="Book not found")
  
  if not book.content:
    raise HTTPException(status_code=400, detail="Book content is empty")

  headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json",
  }
  payload = {
    "text": book.content,
    "tasks": ["summarize", "extract_entities", "detect-language", "analyze_sentiment"]
  }

  async with httpx.AsyncClient() as client:
    response = await client.post(GROQ_API_URL, headers=headers, json=payload)

    if response.status_code != 200:
      raise HTTPException(status_code=500, detail="Failed to analyze the book content with Groq API")
    
    analysis_result = response.json()

  return {
    "summary": analysis_result.get("summary", "No summary available"),
    "key_characters": analysis_result.get("entities", {}).get("characters", []),
    "language": analysis_result.get("language", "Unknown"),
    "sentiment": analysis_result.get("sentiment", "Neutral")
  }