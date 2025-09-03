from pydantic import BaseModel

class PostLikeBase(BaseModel):
    post_id: int
    user_id: int

class PostLikeRead(PostLikeBase):
    class Config:
        orm_mode = True