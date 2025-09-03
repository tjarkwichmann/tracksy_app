from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChallengeProgressBase(BaseModel):
    user_id: int
    challenge_id: int
    progress: float
    last_updated: datetime

class ChallengeProgressCreate(ChallengeProgressBase):
    pass

class ChallengeProgressRead(ChallengeProgressBase):
    id: int


    class Config:
        orm_mode = True