from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from typing import Any

from app.schemas.run_route_point import RunRoutePoint


class RunBase(BaseModel):
    start_time: datetime
    end_time: datetime
    duration: int
    distance: Optional[float] = None
    average_speed: Optional[float] = None

class RunCreate(RunBase):
    user_id: int
    xp_earned: int
    route_points: list[RunRoutePoint] = []

class RunRead(RunBase):
    id: int
    xp_earned: int = 0
    class Config:
        orm_mode = True

class RunWithBadgesResponse(BaseModel):
    run: RunRead
    badges: list[Any] = []  

    class Config:
        orm_mode = True
        from_attributes = True