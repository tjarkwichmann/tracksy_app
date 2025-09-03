"use server";
import argon2 from "argon2";
import { WorkoutCreateRequest, RunCreateRequest, LikeRequestData, CommentRequestData } from "@/lib/definitions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getApiUrl } from "@/lib/constants";
import { UserGoal } from "@/lib/definitions";

export async function createWorkout(workoutData: WorkoutCreateRequest) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/workouts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workoutData),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Erstellen des Workouts");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Erstellen des Workouts:", err);
        throw err;
    }
}

export async function createRun(runData: RunCreateRequest) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/runs/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(runData),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Erstellen des Laufs");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Erstellen des Laufs:", err);
        throw err;
    }
}

export async function patchUserXp(xp: number) {
    const API_URL = getApiUrl();
    const session = await getServerSession(authOptions);

    try {
        const response = await fetch(`${API_URL}/users/xp/${session.user.id}?xp=${xp}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ xp }),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Aktualisieren der XP");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Aktualisieren der XP:", err);
        throw err;
    }
}

export async function likePost(likeData: LikeRequestData) {
    const API_URL = getApiUrl();
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_URL}/post/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: session.user.id, post_id: likeData.post_id }),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Liken des Beitrags");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Liken des Beitrags:", err);
        throw err;
    }
}

export async function deleteLike(likeData: LikeRequestData) {
    const API_URL = getApiUrl();
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_URL}/post/like/${likeData.post_id}?user_id=${session.user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Entfernen des Likes");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Entfernen des Likes:", err);
        throw err;
    }
}

export async function commentOnPost(commentData: CommentRequestData) {
    const API_URL = getApiUrl();
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_URL}/post/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: session.user.id,
                post_id: commentData.post_id,
                content: commentData.content,
            }),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Kommentieren des Beitrags");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Kommentieren des Beitrags:", err);
        throw err;
    }
}

export async function createUser(email: string, password: string, name: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password_hash: password,
                name: name,
            }),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Erstellen des Benutzers");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Erstellen des Benutzers:", err);
        throw err;
    }
}

export async function verifyUserPost(email: string, password: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error:", errorData);
            throw new Error(errorData.detail || "Authentication failed");
        }

        const user = await response.json();
        console.log("User verified:", user);
        return user;
    } catch (err) {
        console.error("Backend verification error:", err);
        throw err;
    }
}

export async function assignBadgeToUser(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/badges/user/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Zuweisen des Abzeichens");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Zuweisen des Abzeichens:", err);
        throw err;
    }
}

export async function createPost(postData: {
    user_id: string;
    content: string;
    group_id?: string;
    workout_id?: string;
    run_id?: string;
    created_at?: string;
}) {
    const API_URL = getApiUrl();
    const response = await fetch(`${API_URL}/posts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        console.error("Fehler beim Erstellen des Beitrags:", response.statusText);
        throw new Error("Fehler beim Erstellen des Beitrags");
    }

    return await response.json();
}

export async function changeWeeklyGoal(userId: string, goalType: string, targetValue: number) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/goals/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ goal_type: goalType, target_value: targetValue }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error Response:", errorData);
            throw new Error(
                `Fehler beim Aktualisieren des wöchentlichen Ziels: ${response.status} ${response.statusText}`
            );
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Aktualisieren des wöchentlichen Ziels:", err);
        throw err;
    }
}

export async function createUserGoal(userId: string, goalType: string, targetValue: number, startDate: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/goals/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: parseInt(userId),
                goal_type: goalType,
                target_value: targetValue,
                start_date: startDate,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error Response:", errorData);
            throw new Error(`Fehler beim Erstellen des Ziels: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Erstellen des Ziels:", err);
        throw err;
    }
}
