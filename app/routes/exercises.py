from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.exercise import ExerciseRead, ExerciseBase
from app.db.database import get_db
from app.models.exercise import Exercise
router = APIRouter(prefix="/exercises", tags=["exercises"])

@router.get("/", response_model=list[ExerciseRead])
def get_all_exercises(db: Session = Depends(get_db)):
    exercises = db.query(Exercise).all()
    if not exercises:
        raise HTTPException(status_code=404, detail="Keine Übungen gefunden")
    return exercises

@router.get("/{exercise_id}", response_model=ExerciseRead)
def get_exercise_by_id(exercise_id: int, db: Session = Depends(get_db)):
    exercise = db.query(Exercise).get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Übung nicht gefunden")
    return exercise

@router.post("/", response_model=ExerciseRead)
def create_exercise(exercise: ExerciseBase, db: Session = Depends(get_db)):
    new_exercise = Exercise(**exercise.model_dump())
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)
    return new_exercise