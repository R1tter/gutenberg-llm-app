from fastapi import FastAPI
from fastapi import HTTPException
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
# Mock book database

books = [
  {"id": 1, "title": "Pride and Prejudice", "author": "Jane Austen"},
  {"id": 2, "title": "Moby Dick", "author": "Herman Melville"},
  {"id": 3, "title": "The Adventures of Sherlock Holmes", "author": "Arthur Conan Doyle"},
]

@app.get("/books", response_model=List[dict])
async def get_books():
  return books

@app.get("/books/{book_id}", response_model=dict)
async def get_book_details(book_id: int):
    for book in books:
        if book["id"] == book_id:
            # Add a fictional book content
            return {
                "id": book["id"],
                "title": book["title"],
                "author": book["author"],
                "content": "This is a sample excerpt of the book content...",
            }
    raise HTTPException(status_code=404, detail="Book not found")