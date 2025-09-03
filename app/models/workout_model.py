from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base

class Workout(Base):
    __tablename__ = "workouts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    duration = Column(Integer, nullable=False)
    xp_earned = Column(Integer, default=0)


    sets = relationship("ExerciseSet", back_populates="workout", cascade="all, delete")
