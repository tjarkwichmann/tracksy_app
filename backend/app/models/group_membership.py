from sqlalchemy import Column, Integer, ForeignKey
from app.db.database import Base

class GroupMembership(Base):
    __tablename__ = "group_memberships"
    group_id = Column(Integer, ForeignKey("groups.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)