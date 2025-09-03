# Tracksy - Backend API

A comprehensive fitness tracking REST API built with FastAPI that provides backend services for activity tracking, social features, and gamification systems.

## Project Overview

Tracksy Backend is a RESTful API service that powers the Tracksy fitness application. It provides endpoints for user management, activity tracking (runs and workouts), social networking features, gamification through badges and challenges, and comprehensive analytics. Built with FastAPI and PostgreSQL, it offers high-performance async capabilities and automatic API documentation.

## Key Features

-   **User Management**: Registration, authentication, and profile management
-   **Activity Tracking**: Comprehensive logging of runs and workouts with GPS data
-   **Social Network**: Friend connections, posts, comments, and social interactions
-   **Community Groups**: Group creation, membership management, and group activities
-   **Gamification System**: XP tracking, leveling, badges, and achievement system
-   **Challenge System**: Create and participate in fitness challenges
-   **Goal Management**: Weekly goals and progress tracking
-   **Analytics**: Detailed statistics and progress analytics

## Technical Architecture

-   **Framework**: FastAPI with async/await support
-   **Database**: PostgreSQL with SQLAlchemy ORM
-   **Authentication**: Argon2 password hashing
-   **Geospatial**: GeoAlchemy2 for GPS route tracking
-   **Deployment**: Docker containerization
-   **CORS**: Configured for cross-origin requests

## Project Structure

```text
app/
├── main.py                   # FastAPI application entry point
├── __init__.py
│
├── core/                     # Core business logic
│   ├── acquire_badges.py     # Badge acquisition logic
│   ├── config.py            # Application configuration
│   ├── levelling.py         # XP and leveling system
│   └── update_challenge_progress.py  # Challenge progress tracking
│
├── db/                      # Database configuration
│   └── database.py          # SQLAlchemy setup and connection management
│
├── models/                  # SQLAlchemy ORM models
│   ├── __init__.py
│   ├── user_model.py        # User model
│   ├── run_model.py         # Running activity model
│   ├── workout_model.py     # Workout activity model
│   ├── exercise_model.py    # Exercise definitions
│   ├── exercise_set_model.py # Exercise set tracking
│   ├── badge_model.py       # Badge definitions
│   ├── badge_type_model.py  # Badge type classifications
│   ├── user_badge_model.py  # User badge achievements
│   ├── challenge_model.py   # Challenge definitions
│   ├── challenge_progress_model.py # Challenge progress tracking
│   ├── challenge_type_model.py # Challenge type classifications
│   ├── friend_model.py      # Friend relationships
│   ├── group_model.py       # Community groups
│   ├── group_membership_model.py # Group membership tracking
│   ├── post_model.py        # Social posts
│   ├── post_comment_model.py # Post comments
│   ├── post_like_model.py   # Post likes
│   ├── weekly_goal_model.py # Weekly fitness goals
│   ├── goal_type_model.py   # Goal type definitions
│   └── run_route_points_model.py # GPS route point data
│
├── routes/                  # API endpoint definitions
│   ├── users_routes.py      # User management endpoints
│   ├── runs_routes.py       # Running activity endpoints
│   ├── workouts_routes.py   # Workout endpoints
│   ├── exercises_routes.py  # Exercise management
│   ├── posts_routes.py      # Social post endpoints
│   ├── post_comments_routes.py # Comment endpoints
│   ├── post_likes_routes.py # Like endpoints
│   ├── friends_routes.py    # Friend management
│   ├── groups_routes.py     # Group management
│   ├── group_memberships_routes.py # Group membership endpoints
│   ├── badges_routes.py     # Badge system endpoints
│   ├── challenges_routes.py # Challenge endpoints
│   └── weekly_goals_routes.py # Goal management endpoints
│
└── schemas/                 # Pydantic schemas for request/response
    ├── user_schemas.py      # User schemas
    ├── run_schemas.py       # Run schemas
    ├── workout_schemas.py   # Workout schemas
    ├── exercise_schemas.py # Exercise schemas
    ├── exercise_set_schemas.py # Exercise set schemas
    ├── badge_schemas.py     # Badge schemas
    ├── user_badge_schemas.py # User badge schemas
    ├── challenge_schemas.py # Challenge schemas
    ├── challenge_progress_schemas.py # Challenge progress schemas
    ├── friend_schemas.py    # Friend schemas
    ├── group_schemas.py     # Group schemas
    ├── group_membership_schemas.py # Group membership schemas
    ├── post_schemas.py      # Post schemas
    ├── post_comment_schemas.py # Comment schemas
    ├── post_like_schemas.py # Like schemas
    ├── weekly_goal_schemas.py # Goal schemas
    ├── goal_schemas.py      # Goal type schemas
    ├── user_goal_schemas.py # User goal relation schemas
    └── run_route_point_schemas.py # Route point schemas
```

## API Endpoints

### User Management

-   `POST /users/` - User registration
-   `POST /users/login` - User authentication
-   `GET /users/` - List all users
-   `GET /users/id/{user_id}` - Get user by ID
-   `GET /users/email/{email}` - Get user by email
-   `GET /users/name/{name}` - Get user by name
-   `PATCH /users/xp/{user_id}` - Update user XP
-   `DELETE /users/{user_id}` - Delete user

### Activity Tracking

-   `POST /runs/` - Log a new run
-   `GET /runs/user/{user_id}` - Get user's runs
-   `POST /workouts/` - Log a new workout
-   `GET /workouts/user/{user_id}` - Get user's workouts

### Social Features

-   `POST /posts/` - Create a post
-   `GET /posts/` - Get posts feed
-   `POST /post-comments/` - Add comment
-   `POST /post-likes/` - Like/unlike post
-   `POST /friends/` - Send friend request
-   `GET /friends/user/{user_id}` - Get user's friends

### Groups & Challenges

-   `POST /groups/` - Create a group
-   `GET /groups/` - List groups
-   `POST /group-memberships/` - Join group
-   `POST /challenges/` - Create challenge
-   `GET /challenges/` - List challenges

### Gamification

-   `GET /badges/` - List available badges
-   `GET /badges/user/{user_id}` - Get user's badges
-   `POST /weekly-goals/` - Set weekly goal
-   `GET /weekly-goals/user/{user_id}` - Get user's goals

## Development Setup

### Prerequisites

-   Python 3.11+
-   PostgreSQL 12+
-   Docker (optional)

### Local Development

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd tracksy_app_backend
    ```

2. **Set up virtual environment**

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    ```

3. **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:

    ```env
    DATABASE_URL=postgresql://username:password@localhost:5432/tracksy_db
    ```

5. **Set up database**

    ```bash
    # Create PostgreSQL database
    createdb tracksy_db
    ```

6. **Run the application**

    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

7. **Access the API**
    - API: <http://localhost:8000>
    - Interactive docs: <http://localhost:8000/docs>
    - ReDoc documentation: <http://localhost:8000/redoc>

### Docker Development

1. **Build and run with Docker**

    ```bash
    docker build -t tracksy-backend .
    docker run -p 8000:8000 -e DATABASE_URL=your_db_url tracksy-backend
    ```

## Database Schema

The application uses PostgreSQL with SQLAlchemy ORM. Key entities include:

-   **Users**: Core user profiles with XP and leveling
-   **Activities**: Runs and workouts with detailed metrics
-   **Social**: Posts, comments, likes, and friend relationships
-   **Groups**: Community groups and memberships
-   **Gamification**: Badges, challenges, and achievements
-   **Goals**: Weekly goals and progress tracking
-   **Geography**: GPS route points for run tracking

## Core Business Logic

### Leveling System (`app/core/levelling.py`)

-   XP-based progression system
-   Automatic level calculation
-   Achievement unlocks

### Badge System (`app/core/acquire_badges.py`)

-   Achievement-based badge awards
-   Progress tracking
-   Multiple badge types

### Challenge System (`app/core/update_challenge_progress.py`)

-   Progress tracking for group challenges
-   Automatic completion detection
-   Leaderboard calculations

## API Documentation

FastAPI automatically generates interactive API documentation:

-   **Swagger UI**: `/docs` - Interactive API testing interface
-   **ReDoc**: `/redoc` - Clean, readable documentation

## Configuration

Application configuration is managed through:

-   Environment variables (`.env` file)
-   `app/core/config.py` for application settings

## Security Features

-   **Password Security**: Argon2 hashing for password storage
-   **CORS Configuration**: Configurable cross-origin resource sharing
-   **Input Validation**: Pydantic schemas for request validation
-   **SQL Injection Protection**: SQLAlchemy ORM parameterized queries

## Performance Features

-   **Async Support**: FastAPI async/await for high concurrency
-   **Database Optimization**: SQLAlchemy with connection pooling
-   **Efficient Queries**: Optimized database queries with proper indexing

## Deployment

The application is containerized with Docker and includes:

-   Multi-stage build optimization
-   Health checks
-   Graceful shutdown handling
-   Environment-based configuration

## Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Write docstrings for public APIs
4. Include unit tests for new features
5. Update API documentation as needed

## Dependencies

Key dependencies include:

-   **FastAPI**: Modern, fast web framework
-   **SQLAlchemy**: Python SQL toolkit and ORM
-   **PostgreSQL**: Primary database (psycopg2-binary)
-   **Argon2**: Password hashing library
-   **GeoAlchemy2**: Geospatial database support
-   **Uvicorn**: ASGI server implementation
-   **Gunicorn**: WSGI HTTP server for production

## License

[Add your license information here]
