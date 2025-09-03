from pydantic import BaseModel
from typing import Optional
from datetime import date
from app.models.challenge_type_model import ChallengeType

class ChallengeBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: ChallengeType
    target_value: float
    start_date: date
    end_date: date
    group_id: Optional[int] = None

class ChallengeRead(ChallengeBase):
    id: int
    class Config:
        orm_mode = True