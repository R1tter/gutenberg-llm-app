from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine
from routers import books, analysis

# Starting database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(books.router, prefix="/api", tags=["books"])
app.include_router(analysis.router, prefix="/api", tags=["analysis"])