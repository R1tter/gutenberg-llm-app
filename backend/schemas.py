from pydantic import BaseModel

# Books schemas

class BookBase(BaseModel):
  id = int
  title: str
  author: str | None

class BookCreate(BookBase):
  content: str

class BookResponse(BookBase):
  pass