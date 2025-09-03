from sqlalchemy import Column, Integer, ForeignKey
from app.db.database import Base

class PostLike(Base):
    __tablename__ = "post_likes"
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)