from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import OperationalError
from typing import Generator
import os
import time
from dotenv import load_dotenv
from app.db.base import Base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set")


"""Auf Datenbankverbindung warten, um sicherzustellen, dass sie bereit ist."""
def wait_for_database(max_retries: int = 30, delay: int = 2):
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable not set")
        
    for attempt in range(max_retries):
        try:
            test_engine = create_engine(DATABASE_URL)
            connection = test_engine.connect()
            connection.close()
            test_engine.dispose()
            print(f"Database connection successful on attempt {attempt + 1}")
            return True
        except OperationalError as e:
            print(f"Database connection attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                print(f"Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                raise Exception("Database is not available after multiple attempts")
    return False

# Wait for database to be ready
wait_for_database()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    """Create all database tables using SQLAlchemy metadata."""
    try:
        # Import all models to ensure they are registered with Base.metadata
        from app.models import (
            post_comment_model, post_like_model, post_model, run_model, 
            run_route_points_model, user_badge_model, user_model, weekly_goal_model, 
            workout_model, exercise_model, exercise_set_model, badge_model,
            friend_model, group_model, group_membership_model, challenge_model, 
            challenge_progress_model, badge_type_model, challenge_type_model, goal_type_model
        )
        
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully!")
        
    except Exception as e:
        print(f"Error creating database tables: {e}")
        raise


def run_migrations():
    """Create all tables. This replaces Alembic migrations."""
    create_tables()