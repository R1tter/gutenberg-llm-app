from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from db import get_db
from models import Book
from schemas import BookResponse
from services.gutenberg import fetch_book_data

router = APIRouter()


@router.get("/books", response_model=list[BookResponse])
def get_all_books(author: str = None, db: Session = Depends(get_db)):
    if author:
        search_terms = author.split()
        filters = [Book.author.ilike(f"%{term}%") for term in search_terms]
        books = db.query(Book).filter(or_(*filters)).all()
        if not books:
            raise HTTPException(status_code=404, detail="No books found for the given author.")
    else:
        books = db.query(Book).all()
        if not books:
            raise HTTPException(status_code=404, detail="No books found.")
    return books


@router.post("/books/{book_id}", response_model=BookResponse)
def fetch_and_save_book(book_id: int, db: Session = Depends(get_db)):
    # Check if the book already exists
    existing_book = db.query(Book).filter(Book.id == book_id).first()
    if existing_book:
        return existing_book
    
    # Fetch book data and save it in the database
    try:
        book_data = fetch_book_data(book_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    # Save the book in the database
    db_book = Book(
        id=book_id,
        title=book_data["title"],
        author=book_data["author"],
        content=book_data["content"]
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book