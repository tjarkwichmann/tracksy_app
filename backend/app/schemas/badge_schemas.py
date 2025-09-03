from pydantic import BaseModel
from typing import Optional
from app.models.badge_type_model import BadgeType

class BadgeBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: BadgeType
    activity_type: str
    requirement: int
    xp_reward: Optional[int] = 0

class BadgeRead(BadgeBase):
    id: int
    class Config:
        from_attributes=True
