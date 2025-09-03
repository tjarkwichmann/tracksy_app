from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.workout_model import Workout
from app.schemas.workout_schemas import WorkoutCreate, WorkoutRead, WorkoutWithBadgesResponse
from app.models.exercise_set_model import ExerciseSet
from app.core.levelling import update_xp_and_check_level_up
from app.core.update_challenge_progress import update_challenge_progress_with_workout
from app.core.acquire_badges import acquire_badges
from app.schemas.exercise_set_schmemas import ExerciseSetRead

router = APIRouter(prefix="/workouts", tags=["workouts"])

@router.get("/users/{user_id}", response_model=list[WorkoutRead])
def get_workouts_by_user_id(user_id: int, db: Session = Depends(get_db)):
    workouts = db.query(Workout).filter(Workout.user_id == user_id).all()
    return workouts

@router.get("/workout/{workout_id}", response_model=WorkoutRead)
def get_workout_by_id(workout_id: int, db: Session = Depends(get_db)):
    workout = db.query(Workout).get(workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout nicht gefunden")
    return workout

@router.post("/", response_model=WorkoutWithBadgesResponse)
def create_workout(workout: WorkoutCreate, db: Session = Depends(get_db)):
    new_workout = Workout(
        user_id=workout.user_id,
        start_time=workout.start_time,
        end_time=workout.end_time,
        duration=workout.duration,
        xp_earned=workout.xp_earned
    )

    db.add(new_workout)
    db.commit()          
    db.refresh(new_workout)

    for exercise_set in workout.sets:
        new_set = ExerciseSet(
            workout_id=new_workout.id,
            exercise_id=exercise_set.exercise_id,
            weight=exercise_set.weight,
            reps=exercise_set.reps
        )
        db.add(new_set)
    db.commit()

    sets = db.query(ExerciseSet).filter(ExerciseSet.workout_id == new_workout.id).all()
    
    sets_read = [ExerciseSetRead.model_validate(s, from_attributes=True) for s in sets]

    workout_read = WorkoutRead.model_validate(new_workout, from_attributes=True)
    workout_read.sets = sets_read  

    update_xp_and_check_level_up(workout.user_id, workout.xp_earned, db)
    update_challenge_progress_with_workout(workout.user_id, db)
    badges = acquire_badges(workout.user_id, db)

    return WorkoutWithBadgesResponse(
        workout=workout_read,
        badges=badges
    )


@router.delete("/{workout_id}")
def delete_workout(workout_id: int, db: Session = Depends(get_db)):
    workout = db.query(Workout).get(workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout nicht gefunden")
    db.delete(workout)
    db.commit()
    return {"message": f"Workout mit ID {workout_id} gelöscht."}

@router.get("/latest/{user_id}", response_model=WorkoutRead)
def get_latest_workout(user_id: int, db: Session = Depends(get_db)):
    latest_workout = db.query(Workout).filter(Workout.user_id == user_id).order_by(Workout.start_time.desc()).first()
    if not latest_workout:
        raise HTTPException(status_code=404, detail="Kein Workout gefunden")
    return latest_workout


@router.get("/week/{user_id}", response_model=list[WorkoutRead])
def get_runs_of_current_week(user_id: int, db: Session = Depends(get_db)):
    today = datetime.now().date()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    
    workout = db.query(Workout).filter(
        Workout.user_id == user_id,
        func.date(Workout.start_time) >= start_of_week,
        func.date(Workout.start_time) <= end_of_week
    ).all()

    return workout