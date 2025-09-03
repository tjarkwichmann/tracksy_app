from pydantic import BaseModel
from typing import Optional

class GoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    target_value: float
    exercise_id: Optional[int] = None
    start_offset: str
    xp_reward: int = 0
    badge_id: Optional[int] = None

class GoalRead(GoalBase):
    id: int
    class Config:
        orm_mode = True