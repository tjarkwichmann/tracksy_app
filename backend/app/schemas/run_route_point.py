from datetime import datetime
from pydantic import BaseModel


class RunRoutePoint(BaseModel):
    latitude: float
    longitude: float
    time_stamp: datetime

    class Config:
        from_attributes = True
