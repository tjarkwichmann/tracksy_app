from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.post_like_model import PostLike
from app.schemas.post_like_schemas import PostLikeBase, PostLikeRead

router = APIRouter(prefix="/post", tags=["posts"])

@router.get("/likes/{post_id}", response_model=list[PostLikeRead])
def get_likes_by_post_id(post_id: int, db: Session = Depends(get_db)):
    likes = db.query(PostLike).filter(PostLike.post_id == post_id).all()
    return likes

@router.post("/like", response_model=PostLikeRead)
def create_like(like: PostLikeBase, db: Session = Depends(get_db)):
    new_like = PostLike(**like.model_dump())
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like

@router.delete("/like/{post_id}", response_model=PostLikeRead)
def delete_like(post_id: int,  user_id: int = Query(...), db: Session = Depends(get_db)):
    like = db.query(PostLike).filter(PostLike.post_id ==  post_id, PostLike.user_id == user_id).first()
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(like)
    db.commit()
    return like


@router.get("/likes/user/{user_id}", response_model=list[PostLikeRead])
def get_likes_by_user_id(user_id: int, db: Session = Depends(get_db)):
    likes = db.query(PostLike).filter(PostLike.user_id == user_id).all()
    if not likes:
        raise HTTPException(status_code=404, detail="Likes not found")
    return likes