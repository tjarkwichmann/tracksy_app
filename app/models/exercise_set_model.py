from sqlalchemy import Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.db.database import Base

class ExerciseSet(Base):
    __tablename__ = "exercise_sets"
    id = Column(Integer, primary_key=True)
    workout_id = Column(Integer, ForeignKey("workouts.id", ondelete="CASCADE"), nullable=False)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), nullable=False)
    weight = Column(Float, nullable=False)
    reps = Column(Integer, nullable=False)

    workout = relationship("Workout", back_populates="sets")
    exercise = relationship("Exercise")
