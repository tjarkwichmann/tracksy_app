from pydantic import BaseModel
from datetime import datetime

class PostCommentBase(BaseModel):
    content: str
    user_id: int
    post_id: int


class PostCommentRead(PostCommentBase):
    created_at: datetime
    comment_id: int
    class Config:
        orm_mode = True