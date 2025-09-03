from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from datetime import datetime
from app.db.database import Base


class PostComment(Base):
    __tablename__ = "post_comments"
    comment_id = Column(Integer, primary_key=True, autoincrement=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)