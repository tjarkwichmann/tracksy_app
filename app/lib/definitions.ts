export type SetWithSetId = {
    id: string;
    exercise_id: string;
    weight: number;
    reps: number;
};

export type WorkoutExercise = {
    id: string;
    name: string;
    exerciseId: string;
    sets: SetWithSetId[];
};

export type WorkoutCreateRequest = {
    start_time: string;
    end_time: string;
    duration: number;
    xp_earned: number;
    user_id: number;
    sets: Array<{
        exercise_id: number;
        weight: number;
        reps: number;
    }>;
};

export type RoutePoint = {
    latitude: number;
    longitude: number;
    time_stamp: string;
};

export type RunCreateRequest = {
    user_id: number;
    start_time: string;
    end_time: string;
    duration: number;
    distance: string;
    xp_earned: number;
    average_speed: number;
    route?: RoutePoint[];
};

export type Exercise = {
    id: string;
    name: string;
    description: string;
};

export type Post = {
    id: string;
    user_id: string;
    content: string;
    created_at: Date;
    likes: number;
    comments: Comment[];
    group_id?: string;
    run_id?: string;
    workout_id?: string;
};

export type Comment = {
    user_id: string;
    user_name: string;
    comment_id: string;
    content: string;
    created_at: string;
};

export type LikeRequestData = {
    post_id: string;
};

export type CommentRequestData = {
    post_id: string;
    content: string;
};

export type SetWithoutSetId = {
    exercise_id: string;
    reps: number;
    weight: number;
};

export type WorkoutProp = {
    workout: {
        start_time: string;
        end_time: string;
        duration: number;
        xp_earned: number;
        user_id: number;
        sets: SetWithoutSetId[];
    };
};

export type UserGoal = {
    user_id: string;
    start_date: string;
    goal_type: string;
    target_value: number;
};
