from pydantic import BaseModel
from datetime import datetime

class UserBadgeRead(BaseModel):
    id: int
    user_id: int
    badge_id: int
    earned_at: datetime
    class Config:
        orm_mode = True