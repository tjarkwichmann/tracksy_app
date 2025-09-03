from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.models.run_route_points_model import RunRoutePoints
from shapely.geometry import Point
from geoalchemy2.shape import from_shape

from app.core.acquire_badges import acquire_badges
from app.db.database import get_db
from app.models.run_model import Run
from app.schemas.run_schemas import RunCreate, RunRead, RunWithBadgesResponse
from app.core.update_challenge_progress import update_challenge_progress_with_run
from app.core.levelling import update_xp_and_check_level_up


router = APIRouter(prefix="/runs", tags=["runs"])



@router.get("/users/{user_id}", response_model=list[RunRead])
def get_runs_by_user_id(user_id: int, db: Session = Depends(get_db)):
    runs = db.query(Run).filter(Run.user_id == user_id).all()
    return runs


@router.get("/run/{run_id}", response_model=RunRead)
def get_run_by_id(run_id: int, db: Session = Depends(get_db)):
    run = db.query(Run).get(run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Lauf nicht gefunden")
    return run


@router.post("/", response_model=RunWithBadgesResponse)
def create_run(run: RunCreate, db: Session = Depends(get_db)):
    geom = None
   

    new_run = Run(
        user_id=run.user_id,
        start_time=run.start_time,
        end_time=run.end_time,
        duration=run.duration,
        distance=run.distance,
        average_speed=run.average_speed,
        xp_earned=run.xp_earned,
    )
    db.add(new_run)
    update_challenge_progress_with_run(run.user_id, new_run, db)
    update_xp_and_check_level_up(run.user_id, run.xp_earned, db)
    acquired_badges = acquire_badges(run.user_id, db)


    for point in run.route_points:
        geom_point = from_shape(Point(point.longitude, point.latitude), srid=4326)
        route_point = RunRoutePoints(
            run_id=new_run.id,
            point=geom_point,
            time_stamp=point.time_stamp
        )
        db.add(route_point)
        

    db.commit()
    db.refresh(new_run)
    return RunWithBadgesResponse(
        run=RunRead.model_validate(new_run, from_attributes=True),
        badges=acquired_badges
    )


@router.delete("/{run_id}")
def delete_run(run_id: int, db: Session = Depends(get_db)):
    run = db.query(Run).get(run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Lauf nicht gefunden")
    db.delete(run)
    db.commit()
    return {"message": f"Lauf mit ID {run_id} gelöscht."}


@router.get("/latest/{user_id}", response_model=RunRead)
def get_latest_run(user_id: int, db: Session = Depends(get_db)):
    latest_run = db.query(Run).filter(Run.user_id == user_id).order_by(Run.start_time.desc()).first()
    if not latest_run:
        raise HTTPException(status_code=404, detail="Keine Läufe gefunden")
    return latest_run


@router.get("/week/{user_id}", response_model=list[RunRead])
def get_runs_of_current_week(user_id: int, db: Session = Depends(get_db)):
    today = datetime.now().date()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    
    runs = db.query(Run).filter(
        Run.user_id == user_id,
        func.date(Run.start_time) >= start_of_week,
        func.date(Run.start_time) <= end_of_week
    ).all()

    return runs
