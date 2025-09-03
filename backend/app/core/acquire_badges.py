from datetime import datetime
from app.schemas.badge import BadgeRead
from app.models.badge import Badges
from sqlalchemy.orm import Session
from app.db.database import get_db
from fastapi import Depends, HTTPException
from app.models.user import User
from app.models.user_badge import UserBadge
from app.models.workout import Workout
from app.models.run import Run

def acquire_badges(user_id: int, db: Session = Depends(get_db)) -> list[BadgeRead]:
    """
    Acquires badges for a user based on their achievements.
    """

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_badges = db.query(UserBadge).filter(UserBadge.user_id == user_id).all()
    run_count = db.query(Run).filter(Run.user_id == user_id).count()
    workout_count = db.query(Workout).filter(Workout.user_id == user_id).count()

    acquired_badges = []
    
    user_badge_title = {badge.title for badge in db.query(Badges).filter(Badges.id.in_([ub.badge_id for ub in user_badges])).all()}

    for badge in db.query(Badges).all():
        if badge.title in user_badge_title:
            continue

        if getattr(badge, "type") is not None and getattr(badge, "activity_type") is not None:
            if getattr(badge, "activity_type") == "workout" and workout_count >= getattr(badge, "requirement"):
                award_badge(badge.title, user_id, db)
                acquired_badges.append(BadgeRead.model_validate(badge))
            elif getattr(badge, "activity_type") == "run" and run_count >= getattr(badge, "requirement"):
                award_badge(badge.title, user_id, db)
                acquired_badges.append(BadgeRead.model_validate(badge))
            elif getattr(badge, "activity_type") == "all" and ((run_count + workout_count) >= getattr(badge, "requirement")):
                award_badge(badge.title, user_id, db)
                acquired_badges.append(BadgeRead.model_validate(badge))

    return acquired_badges


def award_badge(badge_name, user_id: int, db: Session = Depends(get_db)) -> BadgeRead:
    badge = db.query(Badges).filter(Badges.title == badge_name).first()

    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
        
    if badge:
        new_user_badge = UserBadge(user_id=user_id, badge_id=badge.id, earned_at=datetime.now())
        db.add(new_user_badge)
        db.commit()
        db.refresh(new_user_badge)
        return BadgeRead.model_validate(badge, from_attributes=True)
    else:
        raise HTTPException(status_code=404, detail="Badge not found")

