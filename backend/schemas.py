from pydantic import BaseModel
from typing import Optional

# Books schemas

class BookBase(BaseModel):
    title: str
    author: Optional[str] = None
    content: str
    summary: Optional[str] = None
    language: Optional[str] = None
    year: Optional[int] = None
    cover_image_url: Optional[str] = None

class BookCreate(BookBase):
    pass

class BookResponse(BookBase):
    id: int

    class Config:
        orm_mode = True