from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime
from app.db.database import Base

class UserBadge(Base):
    __tablename__ = "user_badges"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    badge_id = Column(Integer, ForeignKey("badges.id", ondelete="CASCADE"), nullable=False)
    earned_at = Column(DateTime, default=datetime.now)