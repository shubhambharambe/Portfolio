from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class Experience(BaseModel):
    id: int
    title: str
    company: str
    period: str
    description: List[str]

class Skill(BaseModel):
    name: str
    level: str  # e.g., "Expert", "Advanced"

class Profile(BaseModel):
    name: str
    role: str
    summary: str
    contact: dict

# --- Mock Data Based on Resume ---
experiences = [
    {
        "id": 1,
        "title": "Python Developer",
        "company": "TiMadIT Solutions",
        "period": "01/2025 - Present",
        "description": [
            "Developed and maintained scalable Python web applications.",
            "Led design and development of RESTful APIs using Django and DRF.",
            "Managed databases (MySQL, PostgreSQL) and optimized queries.",
            "Implemented authentication (JWT) and integrated React components."
        ]
    },
    {
        "id": 2,
        "title": "Python Intern",
        "company": "ExcellentMinds",
        "period": "10/2024 - 12/2024",
        "description": [
            "Developed python web applications and collaborated with teams.",
            "Assisted in creating RESTful APIs using Django.",
            "Conducted code reviews and wrote unit tests."
        ]
    }
]

skills = [
    {"name": "Python", "level": "Expert"},
    {"name": "Django", "level": "Advanced"},
    {"name": "FastAPI", "level": "Advanced"},
    {"name": "React", "level": "Intermediate"},
    {"name": "PostgreSQL", "level": "Advanced"},
    {"name": "Docker", "level": "Intermediate"},
    {"name": "AWS", "level": "Beginner"}
]

education = [
    {
        "degree": "PGDAC",
        "institution": "CDAC, Noida",
        "period": "03/2023 - 02/2024",
        "details": "Post Graduate Diploma in Advanced Computing"
    },
    {
        "degree": "B.Tech in Computer Science",
        "institution": "Sandip Institute of Technology and Research Centre",
        "period": "12/2020 - 07/2023",
        "details": "Nashik, Maharashtra"
    },
    {
        "degree": "Diploma in Electrical Engineering",
        "institution": "MET, Bhujbal Knowledge City",
        "period": "06/2012 - 05/2018",
        "details": "Nashik, Maharashtra"
    }
]

projects = [
    {
        "title": "Logbook System",
        "tech": "Django, React, PostgreSQL",
        "description": "Digital logbook to eliminate paperwork, managing shift data, work tracking, and reviewer/approver workflows."
    },
    {
        "title": "Asset Track",
        "tech": "FastAPI, React Native, QR Code",
        "description": "Mobile-first asset tracking solution using QR codes for real-time inventory management and auditing."
    }
]

profile_data = {
    "name": "Shubham Bharambe",
    "role": "Python Full-Stack Developer",
    "summary": "Results-oriented Python Full-Stack Developer with 1+ year of experience in Django, FastAPI, React, and React Native. Expert in API development, database design, and performance optimization.",
    "contact": {
        "email": "shubhambharambe15@gmail.com",
        "phone": "9011311270",
        "linkedin": "linkedin.com/in/shubham-bharambe-203153137",
        "location": "Pune, India 411027"
    }
}

# --- Detailed Resume Data for Chat ---
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# --- AI Knowledge Base (Granular Facts) ---
knowledge_base = [
    "I am Shubham Bharambe, a Python Full-Stack Developer.",
    "I have over 1 year of experience in developing scalable web and mobile solutions.",
    "My tech stack includes Python, Django, FastAPI, React, and React Native.",
    "I am currently working as a Python Developer at TiMadIT Solutions (Jan 2025 - Present).",
    "At TiMadIT, I develop RESTful APIs with Django DRF and optimize PostgreSQL queries.",
    "I worked as a Python Intern at ExcellentMinds (Oct 2024 - Dec 2024).",
    "I completed my PGDAC from CDAC Noida in 2024.",
    "I hold a B.Tech in Computer Science from Sandip Institute (2023).",
    "I have a Diploma in Electrical Engineering from MET Bhujbal Knowledge City (2018).",
    "My key projects include a Logbook System (Django/React) for shift tracking.",
    "I built an Asset Track system using FastAPI and React Native with QR code integration.",
    "I am expert in API development, database design, and performance optimization.",
    "You can contact me at shubhambharambe15@gmail.com.",
    "My phone number is 9011311270.",
    "I live in Pune, India.",
    "My skills include Python, OOP, Numpy, Pandas, Django, REST, SQL, Git, and Linux.",
    "I am passionate about building user-focused applications and learning new tech.",
    "Hello! I am an AI assistant trained on Shubham's resume. Ask me anything!"
]

# Train the "Brain"
vectorizer = TfidfVectorizer().fit(knowledge_base)
vectors = vectorizer.transform(knowledge_base)

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to Shubham's Smart Portfolio API"}

@app.get("/api/profile", response_model=Profile)
def get_profile():
    return profile_data

@app.get("/api/experience", response_model=List[Experience])
def get_experience():
    return experiences

@app.get("/api/skills", response_model=List[Skill])
def get_skills():
    return skills

@app.get("/api/education")
def get_education():
    return education

@app.get("/api/projects")
def get_projects():
    return projects

class ChatRequest(BaseModel):
    message: str

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
    
    return {"response": knowledge_base[best_index]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
