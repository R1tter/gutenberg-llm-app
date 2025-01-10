from pydantic import BaseModel

# Books schemas

class BookBase(BaseModel):
    id: int
    title: str
    author: str | None = None
    content: str
    language: str | None = None
    year: int | None = None
    cover_image_url: str | None = None

class BookCreate(BookBase):
    content: str

class BookResponse(BookBase):
    id: int
    title: str
    author: str | None = None
    content: str
    language: str | None = None
    year: int | None = None
    cover_image_url: str | None = None

    class Config:
        orm_mode = True
