from pydantic import BaseModel
from typing import Optional

class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None
    owner_id: int


    

class GroupRead(GroupBase):
    id: int
    class Config:
        orm_mode = True