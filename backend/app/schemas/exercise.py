from pydantic import BaseModel
from typing import List

class ExerciseBase(BaseModel):
    name: str
    category: str
    description: str 


class ExerciseRead(ExerciseBase):
    id: int
    class Config:
        orm_mode = True