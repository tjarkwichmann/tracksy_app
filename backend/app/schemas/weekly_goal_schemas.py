from pydantic import BaseModel
from datetime import date
from app.models.goal_type_model import GoalType

class WeeklyGoalBase(BaseModel):
    user_id: int
    start_date: date
    goal_type: GoalType
    target_value: int

class WeeklyGoalCreate(WeeklyGoalBase):
    pass

class WeeklyGoalUpdate(BaseModel):
    goal_type: GoalType | None = None
    target_value: int | None = None

class WeeklyGoalRead(WeeklyGoalBase):
    id: int

    class Config:
        from_attributes = True
        
