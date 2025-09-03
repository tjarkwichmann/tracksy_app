from app.models.user_model import User
from sqlalchemy.orm import Session

def update_xp_and_check_level_up(user_id: int, xp: int,  db: Session):
    user = db.query(User).get(user_id)
    setattr(user, "xp", getattr(user, "xp") + xp)
    db.commit()
    db.refresh(user)
    xp_for_next_level = 1000 * getattr(user, "level")
    leveled_up = False
    while getattr(user, "xp") >= xp_for_next_level:
        setattr(user, "level", getattr(user, "level") + 1)
        leveled_up = True
        xp_for_next_level = 1000 * getattr(user, "level", )
    if leveled_up:
        db.commit()
        db.refresh(user)
    return user
    