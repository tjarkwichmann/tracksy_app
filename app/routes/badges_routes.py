from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.badge_schemas import BadgeBase, BadgeRead
from app.db.database import get_db
from app.models.badge_model import Badges
from app.models.user_badge_model import UserBadge
from datetime import datetime
from app.models.run_model import Run
from app.models.workout_model import Workout
router = APIRouter(prefix="/badges", tags=["badges"])


@router.get("/", response_model=list[BadgeRead])
def get_all_badges(db: Session = Depends(get_db)):
    badges = db.query(Badges).all()
    if not badges:
        raise HTTPException(status_code=404, detail="No badges found")
    return badges

@router.get("/{badge_id}", response_model=BadgeRead)
def get_badge_by_id(badge_id: int, db: Session = Depends(get_db)):
    badge = db.query(Badges).get(badge_id)
    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
    return badge

@router.post("/", response_model=BadgeRead)
def create_badge(badge: BadgeBase, db: Session = Depends(get_db)):
    new_badge = Badges(**badge.model_dump())
    db.add(new_badge)
    db.commit()
    db.refresh(new_badge)
    return new_badge

@router.delete("/{badge_id}", response_model=BadgeRead)
def delete_badge(badge_id: int, db: Session = Depends(get_db)):
    badge = db.query(Badges).get(badge_id)
    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
    db.delete(badge)
    db.commit()
    return badge

@router.get("/user/{user_id}", response_model=list[BadgeRead])
def get_badges_by_user_id(user_id: int, db: Session = Depends(get_db)):
    user_badges = db.query(UserBadge).filter(UserBadge.user_id == user_id).all()
    
    badge_ids = [user_badge.badge_id for user_badge in user_badges]
    badges = db.query(Badges).filter(Badges.id.in_(badge_ids)).all()
    
    return badges

@router.post("/user/{user_id}", response_model=list[BadgeRead])
def assign_badge_to_user(user_id: int, db: Session = Depends(get_db)):
    
    user_badges = db.query(UserBadge).filter(UserBadge.user_id == user_id).all()

    run_count = db.query(Run).filter(Run.user_id == user_id).count()
    workout_count = db.query(Workout).filter(Workout.user_id == user_id).count()
    


    





