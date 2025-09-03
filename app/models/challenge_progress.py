from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from app.db.database import Base
from datetime import datetime 

class ChallengeProgress(Base):
    __tablename__ = "challenge_progress"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    challenge_id = Column(Integer, ForeignKey("challenges.id", ondelete="CASCADE"), nullable=False)
    progress = Column(Integer, default=0)
    last_updated = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    __table_args__ = (
        UniqueConstraint('user_id', 'challenge_id', name='uix_user_challenge'),
    )
