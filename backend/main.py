from fastapi import FastAPI
from typing import List

app = FastAPI()

# Mock book database

books = [
  {"id": 1, "title": "Pride and Prejudice", "author": "Jane Austen"},
  {"id": 2, "title": "Moby Dick", "author": "Herman Melville"},
  {"id": 3, "title": "The Adventures of Sherlock Holmes", "author": "Arthur Conan Doyle"},
]

@app.get("/books", response_model=List[dict])
async def get_books():
  return books