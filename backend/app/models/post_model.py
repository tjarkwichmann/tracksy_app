from sqlalchemy import Integer, Text, DateTime, ForeignKey, Column
from datetime import datetime
from app.db.database import Base

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    group_id = Column(Integer, ForeignKey("groups.id", ondelete="CASCADE"))
    run_id = Column(Integer, ForeignKey("runs.id"))
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    deleted_at = Column(DateTime)