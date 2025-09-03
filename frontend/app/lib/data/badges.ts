import { getApiUrl } from "@/lib/constants";

export async function getAllBadges() {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/badges/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Abzeichen");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Abzeichen:", err);
        throw err;
    }
}

export async function getBadgeById(badgeId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/badges/${badgeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen des Abzeichens");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen des Abzeichens:", err);
        throw err;
    }
}

export async function getUserBadges(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/badges/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Abzeichen des Benutzers");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Abzeichen des Benutzers:", err);
        throw err;
    }
}
