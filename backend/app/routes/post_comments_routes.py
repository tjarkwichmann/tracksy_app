from fastapi import APIRouter, HTTPException, Depends, Query
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.schemas.post_comment_schemas import PostCommentBase, PostCommentRead
from app.models.post_comment_model import PostComment


router = APIRouter(prefix="/post", tags=["posts"])

@router.get("/comments/{post_id}", response_model=list[PostCommentRead])
def get_comments_by_post_id(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(PostComment).filter(PostComment.post_id == post_id).all()
    return comments

@router.post("/comment", response_model=PostCommentRead)
def create_comment(comment: PostCommentBase, db: Session = Depends(get_db)):
    new_comment = PostComment(**comment.model_dump())
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@router.delete("/comment/{post_id}", response_model=PostCommentRead)
def delete_comment(post_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    comment = db.query(PostComment).filter(PostComment.post_id == post_id, PostComment.user_id == user_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
    return comment

@router.get("/comments/comment/{post_id}", response_model=PostCommentRead)
def get_comment_by_id(post_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    comment = db.query(PostComment).filter(PostComment.id == post_id, PostComment.user_id == user_id).first()
    return comment

@router.delete("/comments/comment/{comment_id}", response_model=PostCommentRead)
def delete_comment_by_id(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(PostComment).filter(PostComment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
    return comment
