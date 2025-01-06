from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Book
from schemas import BookCreate, BookResponse
from services.gutenberg import fetch_book_data
from typing import List

router = APIRouter()

@router.post("/books/{book_id}", response_model=BookResponse)
def fetch_and_save_book(book_id: int, db: Session = Depends(get_db)):
  # Get the book
  try:
    book_data = fetch_book_data(book_id)
  except ValueError as e:
    raise HTTPException(status_code=400, detail=str(e))
  
  # Save the book in the database
  db_book = Book(
    id=book_id,
    title=f"Book {book_id}",
    author="unknown", # Metadata can be extracted from HTML page
    content =book_data["content"]
  )
  db.add(db_book)
  db.commit()
  db.refresh(db_book)
  return db_book

@router.get("/books", response_model=List[BookResponse])
def list_books(db: Session = Depends(get_db)):
  return db.query(Book).all()