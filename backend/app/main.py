from fastapi import FastAPI

from app.db import database
from app.routes import (users, runs, weekly_goals, workouts, exercises, posts, post_comments, post_likes, 
                        friends, groups, group_memberships, badges, challenges)
from app.models import (
    user, run, workout, exercise,
    exercise_set, badge,
    user_badge, friend, group, group_membership, post,
    post_like, post_comment, challenge, weekly_goal, challenge_progress, run_route_points
)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router)
app.include_router(runs.router)
app.include_router(workouts.router)
app.include_router(exercises.router)
app.include_router(posts.router)
app.include_router(post_comments.router)
app.include_router(post_likes.router)
app.include_router(friends.router)
app.include_router(groups.router)
app.include_router(group_memberships.router)
app.include_router(badges.router)
app.include_router(challenges.router)
app.include_router(weekly_goals.router)



@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}   


@app.on_event("startup")
def on_startup():
    # Ensure DB is migrated to latest on service start
    database.run_migrations()