from pydantic import BaseModel

class GroupMembershipBase(BaseModel):
    group_id: int
    user_id: int

class GroupMembershipRead(GroupMembershipBase):
    class Config:
        orm_mode = True