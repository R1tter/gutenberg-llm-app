from pydantic import BaseModel

# Books schemas

class BookBase(BaseModel):
    id: int
    title: str
    author: str | None = None
    content: str

class BookCreate(BookBase):
    content: str

class BookResponse(BookBase):
    id: int
    title: str
    author: str | None = None

    class Config:
        orm_mode = True