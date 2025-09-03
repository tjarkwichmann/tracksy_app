from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.weekly_goal_schemas import WeeklyGoalCreate, WeeklyGoalUpdate, WeeklyGoalRead
from app.db.database import get_db
from app.models.weekly_goal_model import WeeklyGoal
import app.models.user_model as User

router = APIRouter(prefix="/goals", tags=["Goals"])

@router.post("/", response_model=WeeklyGoalRead)
def create_goal(goal: WeeklyGoalCreate, db: Session = Depends(get_db)):
    new_goal = goal.model_dump()
    db_goal = WeeklyGoal(**new_goal)  
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.put("/{user_id}", response_model=WeeklyGoalRead)
def update_goal(user_id: int, goal: WeeklyGoalUpdate, db: Session = Depends(get_db)):
    db_goal = db.query(WeeklyGoal).filter(WeeklyGoal.user_id == user_id).first()
    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    update_data = goal.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_goal, key, value)
    
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.get("/{user_id}", response_model=WeeklyGoalRead)
def get_goals_by_user(user_id: int, db: Session = Depends(get_db)):
    goal = db.query(WeeklyGoal).filter(WeeklyGoal.user_id == user_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found for this user")
    return goal


@router.put("/reset/{goal_id}", response_model=WeeklyGoalRead)
def reset_goal(goal_id: int, db: Session = Depends(get_db)):
    db_goal = db.query(WeeklyGoal).get(goal_id)
    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db_goal.target_value = 0
    db.commit()
    db.refresh(db_goal)
    return db_goal