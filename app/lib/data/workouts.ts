import { getApiUrl } from "@/lib/constants";

export async function getUserWorkouts(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/workouts/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log("No workouts found for user:", userId);
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Workouts:", err);
        return [];
    }
}

export async function getWorkoutById(workoutId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/workouts/workout/${workoutId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen des Workouts");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen des Workouts:", err);
        throw err;
    }
}

export async function getWorkoutCount(userId: string): Promise<number> {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/workouts/count/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Workoutanzahl");
        }

        const data = await response.json();
        return data.count || 0;
    } catch (err) {
        console.error("Fehler beim Abrufen der Workoutanzahl:", err);
        throw err;
    }
}

export async function getCurrentWeekWorkouts(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/workouts/week/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log("No workouts found for current week for user:", userId);
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Workouts der aktuellen Woche:", err);
        return [];
    }
}
