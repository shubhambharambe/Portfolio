from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
import models, database, initial_data
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

app = FastAPI()

# Enable CORS
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8082",
    "https://portfolio-nrpg.onrender.com",
    "https://portfoli-m4x7.onrender.com",
    "*"
]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database Startup & Seeding ---
@app.on_event("startup")
def startup_event():
    # Create tables
    models.Base.metadata.create_all(bind=database.engine)
    
    # Check if data exists, if not, seed it
    db = database.SessionLocal()
    try:
        if not db.query(models.Profile).first():
            # Seed Profile
            img_data = initial_data.profile_data
            profile = models.Profile(
                name=img_data["name"], 
                role=img_data["role"], 
                summary=img_data["summary"],
                contact=img_data["contact"]
            )
            db.add(profile)
            
            # Seed Experiences
            for exp in initial_data.experiences:
                db.add(models.Experience(**exp))
                
            # Seed Skills
            for sk in initial_data.skills:
                db.add(models.Skill(**sk))
                
            # Seed Education
            for edu in initial_data.education:
                db.add(models.Education(**edu))
                
            # Seed Projects
            for proj in initial_data.projects:
                db.add(models.Project(**proj))
                
            db.commit()
            print("Database seeded successfully!")
    finally:
        db.close()

# --- Pydantic Models for Response (Schemas) ---
class Experience(BaseModel):
    id: int
    title: str
    company: str
    period: str
    description: List[str]
    
    class Config:
        from_attributes = True

class Skill(BaseModel):
    name: str
    level: str
    
    class Config:
        from_attributes = True

class Profile(BaseModel):
    name: str
    role: str
    summary: str
    contact: dict
    
    class Config:
        from_attributes = True
        
class Education(BaseModel):
    degree: str
    institution: str
    period: str
    details: str
    
    class Config:
        from_attributes = True
        
class Project(BaseModel):
    title: str
    tech: str
    description: str
    
    class Config:
        orm_mode = True

# --- Chat Logic Setup ---
# We keep knowledge_base in memory for the vectorizer as it's small and meant for the AI Logic
# If desired, this could also be moved to DB, but TfidfVectorizer needs a list of strings anyway.
vectorizer = TfidfVectorizer().fit(initial_data.knowledge_base)
vectors = vectorizer.transform(initial_data.knowledge_base)

class ChatRequest(BaseModel):
    message: str

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to Shubham's Smart Portfolio API (DB Connected!)"}

@app.get("/api/profile", response_model=Profile)
def get_profile(db: Session = Depends(database.get_db)):
    return db.query(models.Profile).first()

@app.get("/api/experience", response_model=List[Experience])
def get_experience(db: Session = Depends(database.get_db)):
    return db.query(models.Experience).all()

@app.get("/api/skills", response_model=List[Skill])
def get_skills(db: Session = Depends(database.get_db)):
    return db.query(models.Skill).all()

@app.get("/api/education", response_model=List[Education])
def get_education(db: Session = Depends(database.get_db)):
    return db.query(models.Education).all()

@app.get("/api/projects", response_model=List[Project])
def get_projects(db: Session = Depends(database.get_db)):
    return db.query(models.Project).all()

@app.post("/api/chat")
def chat_with_me(request: ChatRequest):
    user_query = request.message
    
    # Vectorize query and calculate similarity with knowledge base
    query_vec = vectorizer.transform([user_query])
    similarities = cosine_similarity(query_vec, vectors).flatten()
    
    # Find best match
    best_index = np.argmax(similarities)
    best_score = similarities[best_index]
    
    # Threshold for "I don't know"
    if best_score < 0.1:
        return {"response": "That's a great question! I'm mostly trained on Shubham's professional background. Try asking about his projects, experience, or skills."}
    
    return {"response": initial_data.knowledge_base[best_index]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
