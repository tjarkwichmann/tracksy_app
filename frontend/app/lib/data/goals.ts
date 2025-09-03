import { getApiUrl } from "@/lib/constants";

export async function getUserGoal(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/goals/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log("No goal found for user:", userId);
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen des Ziels des Benutzers:", err);
        return null;
    }
}
