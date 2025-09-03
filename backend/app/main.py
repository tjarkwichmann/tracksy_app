from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.db import database
from app.routes import (badges_routes, challenges_routes, exercises_routes, friends_routes, 
                        group_memberships_routes, groups_routes, post_comments_routes, post_likes_routes, posts_routes, 
                        runs_routes, users_routes, weekly_goals_routes, workouts_routes)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure DB is migrated to latest on service start
    database.run_migrations()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_routes.router)
app.include_router(runs_routes.router)
app.include_router(workouts_routes.router)
app.include_router(exercises_routes.router)
app.include_router(posts_routes.router)
app.include_router(post_comments_routes.router)
app.include_router(post_likes_routes.router)
app.include_router(friends_routes.router)
app.include_router(groups_routes.router)
app.include_router(group_memberships_routes.router)
app.include_router(badges_routes.router)
app.include_router(challenges_routes.router)
app.include_router(weekly_goals_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}