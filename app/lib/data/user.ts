import { getApiUrl } from "@/lib/constants";

export async function getUserById(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/users/id/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            if (response.status === 404) {
                console.log("User not found:", userId);
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen des Benutzers:", err);
        return null;
    }
}

export async function getUserFriends(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/friends/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log("No friends found for user:", userId);
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Freunde:", err);
        return [];
    }
}

export async function getFriends(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/users/friends/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Freunde");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Freunde:", err);
        throw err;
    }
}

export async function searchUsersByName(userId: number, name: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/users/search/${userId}?query=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Suchen von Benutzern");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Suchen von Benutzern:", err);
        throw err;
    }
}
