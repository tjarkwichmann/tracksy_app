from datetime import datetime
from typing import Optional
from app.models.challenge_progress_model import ChallengeProgress
from app.models.challenge_model import Challenge
from app.schemas.workout_schemas import WorkoutCreate
from app.db.database import get_db
from fastapi import HTTPException, Depends
from app.schemas.run_schemas import RunCreate
from sqlalchemy.orm import Session
from app.models.user_model import User
from sqlalchemy import and_, or_


def update_challenge_progress_with_run(user_id: int, run_data: RunCreate, db: Session = Depends(get_db)):
    run_challenges_count = db.query(Challenge).filter(
        and_(
        Challenge.end_date > datetime.now().isoformat(),
        Challenge.type == "run_count",
        )
    ).all()
    
    run_challenges_distance = db.query(Challenge).filter(
        and_(
        Challenge.end_date > datetime.now().isoformat(),
        Challenge.type == "run_distance",
        )
    ).all()

    print(run_challenges_count, run_challenges_distance)

    run_challenge_count_ids = [challenge.id for challenge in run_challenges_count]
    run_challenge_distance_ids = [challenge.id for challenge in run_challenges_distance]

    user_progress_count = db.query(ChallengeProgress).filter(
        and_(
            ChallengeProgress.user_id == user_id,
            ChallengeProgress.challenge_id.in_(run_challenge_count_ids),
        )
    ).all()

    user_progress_distance = db.query(ChallengeProgress).filter(
        and_(
            ChallengeProgress.user_id == user_id,
            ChallengeProgress.challenge_id.in_(run_challenge_distance_ids)
        )
    ).all()
    
    if not user_progress_count and not user_progress_distance:
        return
    
    for progress in user_progress_count:
        setattr(progress, "progress", progress.progress + 1)
        print(f"Updated progress for challenge {progress.challenge_id} to {progress.progress}")

        
    for progress in user_progress_distance:
        setattr(progress, "progress", progress.progress + run_data.distance)
        print(f"Updated progress for challenge {progress.challenge_id} to {progress.progress}")

    db.commit()



    

def update_challenge_progress_with_workout(user_id: int, db: Session = Depends(get_db)):
    """
    Updates the challenge progress for a user based on their completed workouts.
    """
    workout_challenges_count = db.query(Challenge).filter(
        and_(
        Challenge.type == "workout_count",
        Challenge.end_date > datetime.now().isoformat()  
        )
    ).all()

    workout_challenge_count_ids = [challenge.id for challenge in workout_challenges_count]

    user_progress_count = db.query(ChallengeProgress).filter(
        and_(
            ChallengeProgress.user_id == user_id,
            ChallengeProgress.challenge_id.in_(workout_challenge_count_ids)
        )
    ).all()


    if not user_progress_count:
        return

    for progress in user_progress_count:
        setattr(progress, "progress", progress.progress + 1)

    db.commit()
    
