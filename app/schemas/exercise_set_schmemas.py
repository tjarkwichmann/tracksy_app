from pydantic import BaseModel
from app.schemas.exercise_schmemas import ExerciseRead

class ExerciseSetBase(BaseModel):
    exercise_id: int
    weight: float
    reps: int

class ExerciseSetRead(ExerciseSetBase):
    id: int
    class Config:
        orm_mode = True