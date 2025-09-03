import { getApiUrl } from "@/lib/constants";

export async function addFriend(userId: string, friendId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/friends/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, friend_id: friendId }),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Hinzufügen des Freundes");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Hinzufügen des Freundes:", err);
        throw err;
    }
}

export async function removeFriend(userId: string, friendId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/friends/friend/${userId}?friend_id=${friendId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Entfernen des Freundes");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Entfernen des Freundes:", err);
        throw err;
    }
}
