from sqlalchemy import Column, Integer, String, Text, Boolean
from db import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    author = Column(String, nullable=True)
    content = Column(Text, nullable=True)
    year = Column(Integer, nullable=True)
    cover_image_url = Column(String, nullable=True)
    language = Column(String, nullable=True)
    summary = Column(String, nullable=True)
    is_favorite = Column(Boolean, default=False)
