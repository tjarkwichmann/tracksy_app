from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password_hash: str

class UserLoginRead(UserBase):
    id: int
    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRead(UserBase):
    id: int
    level: int
    xp: int
    created_at: datetime
    class Config:
        orm_mode = True