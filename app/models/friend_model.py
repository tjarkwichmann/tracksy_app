from sqlalchemy import Column, Integer, ForeignKey
from app.db.database import Base

class Friend(Base):
    __tablename__ = "friends"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    friend_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)