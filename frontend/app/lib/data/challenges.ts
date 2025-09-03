import { getApiUrl } from "@/lib/constants";

export async function getGroupChallenges(groupId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/challenges/group/${groupId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Gruppenherausforderungen");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Gruppenherausforderungen:", err);
        throw err;
    }
}

export async function getGroupChallengeById(challengeId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/challenges/${challengeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Gruppenherausforderung");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Gruppenherausforderung:", err);
        throw err;
    }
}

export async function getChallengesByGroupId(groupId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/challenges/group/${groupId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Herausforderungen der Gruppe");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Herausforderungen der Gruppe:", err);
        throw err;
    }
}

export async function getChallengeProgressByChallengeId(challengeId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/challenges/progress/${challengeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen des Fortschritts der Herausforderung");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen des Fortschritts der Herausforderung:", err);
        throw err;
    }
}

export async function getChallengeByUsesrAndChallgeneId(userId: string, challengeId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/challenges/user/${userId}/challenge/${challengeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Herausforderung für den Benutzer");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Herausforderung für den Benutzer:", err);
        throw err;
    }
}

export async function getUserChallenges(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/challenges/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Herausforderungen des Benutzers");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Herausforderungen des Benutzers:", err);
        throw err;
    }
}
