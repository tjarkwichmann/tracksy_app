from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from app.db.database import Base


class Run(Base):
    __tablename__ = "runs"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    duration = Column(Integer, nullable=False)
    distance = Column(Float)
    average_speed = Column(Float)
    xp_earned = Column(Integer, default=0)