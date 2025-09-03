from sqlalchemy import Column, DateTime, ForeignKey, Integer
from geoalchemy2 import Geometry

from app.db.database import Base


class RunRoutePoints(Base):
    __tablename__ = "run_route_points"
    id = Column(Integer, primary_key=True)
    run_id = Column(Integer, ForeignKey("runs.id"), nullable=False)
    point = Column(Geometry(geometry_type='POINT', srid=4326), nullable=False)
    time_stamp = Column(DateTime, nullable=False)
