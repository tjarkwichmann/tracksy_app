import { getApiUrl } from "@/lib/constants";

export async function getExerciseById(exerciseId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/exercises/${exerciseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Übung");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Übung:", err);
        throw err;
    }
}

export async function getAllExercises() {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/exercises/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Übungen");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Übungen:", err);
        throw err;
    }
}
