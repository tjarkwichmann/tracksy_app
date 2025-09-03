from sqlalchemy import Column, Integer, Enum, ForeignKey, Date
from app.db.database import Base
from app.models.goal_type_model import GoalType

class WeeklyGoal(Base):
    __tablename__ = "weekly_goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(Date, nullable=False)
    goal_type = Column(Enum(GoalType), nullable=False)
    target_value = Column(Integer, nullable=False)
