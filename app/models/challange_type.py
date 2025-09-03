from enum import Enum

class ChallengeType(str, Enum):
    run_distance = "run_distance"
    run_count = "run_count"
    workout_count = "workout_count"
    mixed_count = "mixed_count"
    xp = "xp"