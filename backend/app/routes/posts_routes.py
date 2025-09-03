from fastapi import APIRouter, HTTPException, Depends
from app.db.database import get_db
from app.schemas.post_schemas import PostRead, PostBase, PostCreate
from app.models.post_model import Post
from app.models.user_model import User
from app.models.friend_model import Friend
from sqlalchemy.orm import Session
from sqlalchemy import and_


router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("/users/{user_id}", response_model=list[PostRead])
def get_posts_by_user_id(user_id: int, db: Session = Depends(get_db)):
    posts = db.query(Post).filter(Post.user_id == user_id).all()
    if not db.query(User).filter(User.id == user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    return posts

@router.get("/post/{post_id}", response_model=PostRead)
def get_post_by_id(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=PostRead)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    new_post = Post(**post.model_dump())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


@router.delete("/{post_id}", response_model=PostRead)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
    return post

@router.get("/groups/{group_id}", response_model=list[PostRead])
def get_posts_by_group_id(group_id: int, db: Session = Depends(get_db)):
    posts = db.query(Post).filter(Post.group_id == group_id).all()
    return posts


@router.get("/friends/{user_id}", response_model=list[PostRead])
def get_friends_posts(user_id: int, db: Session = Depends(get_db)):
    friends = db.query(Friend).filter(Friend.user_id == user_id).all()
    user_posts = db.query(Post).filter(Post.user_id == user_id, Post.group_id == None).all()
    if not friends and not user_posts:
        return []
    friend_ids = [f.friend_id for f in friends]  
    if not friend_ids and not user_posts:
        return []
    posts = db.query(Post).filter(
        and_(
            Post.user_id.in_(friend_ids),
            Post.group_id == None
        )
    ).all() + user_posts
    return posts

