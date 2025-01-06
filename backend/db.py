from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/books"

# engine = create_engine(DATABASE_URL)
DATABASE_URL = "sqlite:///./gutenberg.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database context
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()