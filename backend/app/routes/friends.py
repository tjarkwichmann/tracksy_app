from fastapi import APIRouter, Depends, HTTPException, Query
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.models.friend import Friend
from app.schemas.friend import FriendBase, FriendRead

router = APIRouter(prefix="/friends", tags=["friends"])

@router.get("/user/{user_id}", response_model=list[FriendRead])
def get_friends_by_user_id(user_id: int, db: Session = Depends(get_db)):
    friends = db.query(Friend).filter(Friend.user_id == user_id).all()
    return friends

@router.post("/", response_model=FriendRead)
def create_friend(friend: FriendBase, db: Session = Depends(get_db)):
    new_friend = Friend(**friend.model_dump())
    db.add(new_friend)
    db.commit()
    db.refresh(new_friend)
    return new_friend

@router.delete("/friend/{user_id}", response_model=FriendRead)
def delete_friend(user_id: int, friend_id: int = Query(...), db: Session = Depends(get_db)):
    friend = db.query(Friend).filter(Friend.user_id == user_id, Friend.friend_id == friend_id).first()
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found")
    db.delete(friend)
    db.commit()
    return friend

