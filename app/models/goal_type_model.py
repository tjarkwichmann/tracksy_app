from enum import Enum

class GoalType(str, Enum):
    runs = "run_count"
    workouts = "workout_count"
    both = "mixed_count"