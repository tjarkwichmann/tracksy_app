from typing import List
from datetime import datetime
from pydantic import BaseModel
from app.schemas.exercise_set import ExerciseSetBase, ExerciseSetRead
from app.schemas.badge import BadgeRead
class WorkoutBase(BaseModel):
    start_time: datetime
    end_time: datetime
    duration: int
    xp_earned: int = 0

class WorkoutCreate(WorkoutBase):
    user_id: int
    sets: List[ExerciseSetBase]

class WorkoutRead(WorkoutBase):
    id: int
    sets: List[ExerciseSetRead]

    class Config:
        from_attributes = True

class WorkoutWithBadgesResponse(BaseModel):
    workout: WorkoutRead
    badges: List[BadgeRead] = []