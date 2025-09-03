
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.challenge_model import Challenge
from app.schemas.challenge_schemas import ChallengeBase, ChallengeRead
from app.models.challenge_progress_model import ChallengeProgress
from app.schemas.challenge_progress_schemas import ChallengeProgressBase, ChallengeProgressRead
from app.models.group_model import Group
from app.models.group_membership_model import GroupMembership

router = APIRouter(prefix="/challenges", tags=["challenges"])


@router.post("/", response_model=ChallengeRead)
def create_challenge(challenge: ChallengeBase, db: Session = Depends(get_db)):
    group_memberships = db.query(GroupMembership).filter(
        GroupMembership.group_id == challenge.group_id
    ).all()
    if not group_memberships:
        raise HTTPException(status_code=404, detail="No members found for this group")
    new_challenge = Challenge(**challenge.model_dump())
    db.add(new_challenge)
    db.commit()  
    db.refresh(new_challenge)
    for member in group_memberships:
        progress = ChallengeProgress(user_id=member.user_id, challenge_id=new_challenge.id, progress=0)
        db.add(progress)
    db.commit()
    return new_challenge


@router.delete("/{challenge_id}", response_model=ChallengeRead)
def delete_challenge(challenge_id: int, db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    db.delete(challenge)
    db.commit()
    return challenge


@router.get("/{challenge_id}", response_model=ChallengeRead)
def get_challenge_by_id(challenge_id: int, db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return challenge


@router.get("/all", response_model=list[ChallengeRead])
def get_all_challenges(db: Session = Depends(get_db)):
    challenges = db.query(Challenge).all()
    if not challenges:
        raise HTTPException(status_code=404, detail="No challenges found")
    return challenges


@router.get("/user/{user_id}", response_model=list[ChallengeRead])
def get_challenges_by_user_id(user_id: int, db: Session = Depends(get_db)):
    user_challenges = db.query(ChallengeProgress).filter(ChallengeProgress.user_id == user_id).all()
    if not user_challenges:
        return []
    challenge_ids = [progress.challenge_id for progress in user_challenges]
    challenges = db.query(Challenge).filter(Challenge.id.in_(challenge_ids)).all()
    return challenges

@router.get("/group/{group_id}", response_model=list[ChallengeRead])
def get_challenges_by_group_id(group_id: int, db: Session = Depends(get_db)):
    challenges = db.query(Challenge).filter(Challenge.group_id == group_id).all()
    return challenges


@router.get("/progress/{challenge_id}", response_model=list[ChallengeProgressRead])
def get_challenge_progress(challenge_id: int, db: Session = Depends(get_db)):
    progress = db.query(ChallengeProgress).filter(ChallengeProgress.challenge_id == challenge_id).all()
    if not progress:
       return []
    return progress


@router.post("/progress/", response_model=ChallengeProgressRead)
def create_challenge_progress(progress: ChallengeProgressBase, db: Session = Depends(get_db)):
    new_progress = ChallengeProgress(**progress.model_dump())
    db.add(new_progress)
    db.commit()
    db.refresh(new_progress)
    return new_progress

@router.delete("/progress/{progress_id}", response_model=ChallengeProgressRead)
def delete_challenge_progress(progress_id: int, db: Session = Depends(get_db)):
    progress = db.query(ChallengeProgress).filter(ChallengeProgress.id == progress_id).first()
    if not progress:
        raise HTTPException(status_code=404, detail="Challenge progress not found")
    db.delete(progress)
    db.commit()
    return progress


@router.get("/progress/user/{user_id}", response_model=ChallengeProgressRead)
def get_challenge_progress_by_user_id_and_challenge_id(user_id: int, challenge_id: int = Query(...), db: Session = Depends(get_db)):
    progress = db.query(ChallengeProgress).filter(
        ChallengeProgress.user_id == user_id,
        ChallengeProgress.challenge_id == challenge_id
    ).first()
    if not progress:
        raise HTTPException(status_code=404, detail="Challenge progress not found for this user and challenge")
    return progress