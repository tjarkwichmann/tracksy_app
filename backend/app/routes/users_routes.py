

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.schemas.user_schemas import UserCreate, UserRead, UserLogin, UserLoginRead
from app.models.user_model import User
from app.db.database import get_db
from app.models.run_model import Run
from app.models.workout_model import Workout
from app.models.friend_model import Friend

router = APIRouter(prefix="/users", tags=["users"])
ph = PasswordHasher()

@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="E-Mail bereits registriert")
    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=ph.hash(user.password_hash),
        xp=0, 
    )
    db.add(new_user)
    db.commit() 
    db.refresh(new_user)
    return new_user


@router.get("/", response_model=list[UserRead])
def read_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/email/{user_email}", response_model=UserRead)
def read_user_by_email(user_email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    return user

@router.get("/name/{user_name}", response_model=UserRead)
def read_user_by_name(user_name: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.name == user_name).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    return user

@router.get("/id/{user_id}", response_model=UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    return user


@router.patch("/xp/{user_id}", response_model=UserRead)
def update_user_xp(user_id: int, xp: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    user.xp += xp
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    db.delete(user)
    db.commit()
    return {"message": f"Benutzer mit ID {user_id} gelöscht."}



@router.post("/login", response_model=UserLoginRead)
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    try:
        print(f"Login attempt for email: {user_data.email}")
        
        user = db.query(User).filter(User.email == user_data.email).first()
        print(f"User found: {user is not None}")
        
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Ungültige Anmeldedaten"
            )
        
        print(f"User password field: {hasattr(user, 'password_hash')}")
        print(f"User password value: {getattr(user, 'password_hash', 'MISSING')}")
        
        try:
            ph.verify(getattr(user,"password_hash"), user_data.password)
            print("Password verification successful")
            
            return UserLoginRead(
                id=getattr(user,"id"),
                email=getattr(user, 'email'),
                name=getattr(user, 'name'),
            )
            
        except VerifyMismatchError:
            print("Password verification failed")
            raise HTTPException(
                status_code=401,
                detail="Ungültige Anmeldedaten"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in login: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()  # Vollständiger Stack-Trace
        raise HTTPException(
            status_code=500,
            detail="Interner Server-Fehler"
        )
    

@router.get("/count/run/{user_id}", response_model=int)
def get_run_count_by_user_id(user_id: int, db: Session = Depends(get_db)):
    run_count = db.query(Run).filter(Run.user_id == user_id).count()
    return run_count


@router.get("/count/workouts/{user_id}", response_model=int)
def get_workout_count_by_user_id(user_id: int, db: Session = Depends(get_db)):
    workout_count = db.query(Workout).filter(Workout.user_id == user_id).count()
    return workout_count

@router.get("/count/all/{user_id}", response_model=int)
def get_all_count_by_user_id(user_id: int, db: Session = Depends(get_db)):
    run_count = db.query(Run).filter(Run.user_id == user_id).count()
    workout_count = db.query(Workout).filter(Workout.user_id == user_id).count()
    total_count = run_count + workout_count
    return total_count

@router.get("/search/{user_id}", response_model=list[UserRead])
def search_users(user_id: int, query: str,  limit: int = 10, db: Session = Depends(get_db)):
    if not query:
        raise HTTPException(status_code=400, detail="Suchbegriff ist erforderlich")
    
    users = db.query(User).filter(
        User.name.ilike(f"%{query}%"),
        User.id != user_id
    ).limit(limit).all()
    
    if not users:
        raise HTTPException(status_code=404, detail="Keine Benutzer gefunden")
    
    return users