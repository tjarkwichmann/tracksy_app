from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SqlalchemyEnum
from .badge_type import BadgeType
from app.db.database import Base

class Badges(Base):
    __tablename__ = "badges"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    type = Column(SqlalchemyEnum(BadgeType), nullable=False)
    activity_type = Column(String, nullable=False) 
    requirement = Column(Integer, nullable=False)  
    xp_reward = Column(Integer, default=0)