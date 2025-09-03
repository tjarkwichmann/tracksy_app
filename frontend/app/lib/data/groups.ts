import { getApiUrl } from "@/lib/constants";

export async function getAllGroups() {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/groups/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Gruppen");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Gruppen:", err);
        throw err;
    }
}

export function getGroupMemberships(groupId: string) {
    const API_URL = getApiUrl();
    return fetch(`${API_URL}/groups/memberships/group/${groupId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Gruppenmitgliedschaften");
            }
            return response.json();
        })
        .catch((err) => {
            console.error("Fehler beim Abrufen der Gruppenmitgliedschaften:", err);
            throw err;
        });
}

export async function getUserGroups(userId: string) {
    const API_URL = getApiUrl();
    try {
        const groups = await fetch(`${API_URL}/groups/memberships/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!groups.ok) {
            throw new Error("Fehler beim Abrufen der Gruppenmitgliedschaften");
        }

        return await groups.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Gruppenmitgliedschaften:", err);
        throw err;
    }
}

export async function getGroupById(groupId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/groups/${groupId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Gruppe");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Gruppe:", err);
        throw err;
    }
}

export async function searchGroupsByName(userId: number, name: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/groups/search/${userId}?query=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Suchen nach Gruppen");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Suchen nach Gruppen:", err);
        throw err;
    }
}

export async function AddUserToGroup(groupId: string, userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/groups/memberships/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ group_id: groupId, user_id: userId }),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Hinzufügen des Benutzers zur Gruppe");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Hinzufügen des Benutzers zur Gruppe:", err);
        throw err;
    }
}

export async function removeUserFromGroup(groupId: string, userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/groups/memberships/${groupId}?user_id=${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Entfernen des Benutzers aus der Gruppe");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Entfernen des Benutzers aus der Gruppe:", err);
        throw err;
    }
}
