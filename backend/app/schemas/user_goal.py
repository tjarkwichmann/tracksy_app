from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class UserGoalRead(BaseModel):
    id: int
    user_id: int
    goal_id: int
    started_at: date
    ends_at: date
    progress: float
    completed_at: Optional[datetime] = None
    reward_given: bool
    class Config:
        orm_mode = True