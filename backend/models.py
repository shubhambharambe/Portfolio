from sqlalchemy import Column, Integer, String, Text, JSON, ARRAY
from database import Base

class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String)
    summary = Column(Text)
    contact = Column(JSON)  # Stores email, phone, etc.

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    company = Column(String)
    period = Column(String)
    description = Column(ARRAY(String))  # Using Postgres Array

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    level = Column(String)

class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    degree = Column(String)
    institution = Column(String)
    period = Column(String)
    details = Column(String)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    tech = Column(String)
    description = Column(Text)
