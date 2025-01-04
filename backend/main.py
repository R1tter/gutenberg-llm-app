from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Book(BaseModel):
    id: int
    title: str
    author: str

books = [
    {"id": 1, "title": "Pride and Prejudice", "author": "Jane Austen"},
    {"id": 2, "title": "Moby Dick", "author": "Herman Melville"},
    {"id": 3, "title": "The Adventures of Sherlock Holmes", "author": "Arthur Conan Doyle"},
]

@app.get("/books", response_model=List[Book])
async def get_books():
    return books

@app.get("/books/{book_id}", response_model=Book)
async def get_book_details(book_id: int):
    for book in books:
        if book["id"] == book_id:
            return {**book, "content": "This is the content of the book."}
    raise HTTPException(status_code=404, detail="Book not found")

# Defina um modelo para validar o body da requisição
class AnalyzeRequest(BaseModel):
    book_id: int
    content: str

@app.post("/analyze", response_model=Dict[str, str])
async def analyze_text(request: AnalyzeRequest):
    # Extraia o conteúdo do body da requisição
    book_id = request.book_id
    content = request.content
    word_count = len(content.split())
    summary = f"This is a summary for book {book_id}"
    return {"summary": summary, "word_count": str(word_count)}
