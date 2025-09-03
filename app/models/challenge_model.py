from sqlalchemy import Integer, String, Text, DateTime, ForeignKey, Column, Enum as SqlalchemyEnum, Date, Float
from .challange_type import ChallengeType
from app.db.database import Base


class Challenge(Base):
    __tablename__ = "challenges"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    type = Column(SqlalchemyEnum(ChallengeType), nullable=False)
    target_value = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    group_id = Column(Integer, ForeignKey("groups.id"))