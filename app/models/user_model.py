from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.db.database import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now)