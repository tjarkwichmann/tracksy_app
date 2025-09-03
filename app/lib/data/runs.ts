import { getApiUrl } from "@/lib/constants";

export async function getUserRuns(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/runs/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log("No runs found for user:", userId);
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Läufe:", err);
        return [];
    }
}

export async function getRunById(runId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/runs/run/${runId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen des Laufs");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen des Laufs:", err);
        throw err;
    }
}

export async function getRunCount(userId: string): Promise<number> {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/count/runs/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Laufanzahl");
        }

        const data = await response.json();
        return data.count || 0;
    } catch (err) {
        console.error("Fehler beim Abrufen der Laufanzahl:", err);
        throw err;
    }
}

export async function getCurrentWeekRuns(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/runs/week/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Läufe der aktuellen Woche");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Läufe der aktuellen Woche:", err);
        throw err;
    }
}
