from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostBase(BaseModel):
    content: str
    user_id: int
    created_at: datetime
    
class PostCreate(PostBase):
    group_id: Optional[int] = None
    run_id: Optional[int] = None
    workout_id: Optional[int] = None
    
    

class PostRead(PostBase):
    id: int
    group_id: Optional[int] = None
    run_id: Optional[int] = None
    workout_id: Optional[int] = None
    deleted_at: Optional[datetime] = None
    class Config:
        orm_mode = True