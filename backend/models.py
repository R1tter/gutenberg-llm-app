from sqlalchemy import Column, Integer, String, Text
from db import Base

class Book(Base):
  __tablename__ = "books"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, index=True)
  author = Column(String, nullable=True)
  content = Column(Text, nullable=True)
  year = Column(Integer, nullable=True)
  cover_image_url = Column(String, nullable=True)
  language = Column(String, nullable=True)
  summary = Column(Text, nullable=True)