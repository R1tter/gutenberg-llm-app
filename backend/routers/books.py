from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import or_
from db import get_db
from models import Book
from schemas import BookResponse
from services.gutenberg import fetch_book_data

router = APIRouter(prefix="/books")

@router.get("/", response_model=List[BookResponse])
def get_books(id: int = None, author: str = None, db: Session = Depends(get_db)):
    """
    Fetch books by ID or author. If no parameters are provided, return all books.
    """
    if id:  # Search by ID
        book = db.query(Book).filter(Book.id == id).first()
        if not book:
            raise HTTPException(status_code=404, detail="No book found with the given ID.")
        return [book]  # Return as a list to maintain consistency
    
    if author:  # Search by author
        search_terms = author.split()
        filters = [Book.author.ilike(f"%{term}%") for term in search_terms]
        books = db.query(Book).filter(or_(*filters)).all()
        if not books:
            raise HTTPException(status_code=404, detail="No books found for the given author.")
        return books

    # Return all books if no filters are provided
    books = db.query(Book).all()
    if not books:
        raise HTTPException(status_code=404, detail="No books found.")
    return books

@router.get("/{book_id}", response_model=BookResponse)
def fetch_book_by_id(book_id: int, db: Session = Depends(get_db)):
    """
    Fetch a specific book by its ID.
    """
    # Check if the book already exists
    book = db.query(Book).filter(Book.id == book_id).first()
    if book:
        return book

    # Fetch book data and save it in the database if not found
    try:
        book_data = fetch_book_data(book_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    # Save the fetched book in the database
    db_book = Book(
        id=book_id,
        title=book_data["title"],
        author=book_data["author"],
        content=book_data["content"],
        summary=book_data.get("summary"),
        language=book_data.get("language"),
        year=book_data.get("year"),
        cover_image_url=book_data.get("cover_image_url")
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

@router.post("/{book_id}/favorite")
def toggle_favorite(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    book.is_favorite = not book.is_favorite
    db.commit()
    db.refresh(book)
    return {"id": book.id, "is_favorite": book.is_favorite}

# Search route for favorite books
@router.get("/favorites", response_model=List[BookResponse])
def get_favorites(db: Session = Depends(get_db)):
    books = db.query(Book).filter(Book.is_favorite == True).all()
    return books