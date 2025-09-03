import { getApiUrl } from "@/lib/constants";

export async function getCommentsByPostId(postId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/post/comments/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return [];
        } else {
            throw new Error("Fehler beim Abrufen der Kommentare");
        }
    } catch (err) {
        console.error("Fehler beim Abrufen der Kommentare:", err);
        throw err;
    }
}

export async function getLikesByPostId(postId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/post/likes/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return [];
        } else {
            throw new Error("Fehler beim Abrufen der Likes");
        }
    } catch (err) {
        console.error("Fehler beim Abrufen der Likes:", err);
        throw err;
    }
}

export async function getPostsFromFriends(userId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/posts/friends/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Beiträge von Freunden");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Beiträge von Freunden:", err);
        throw err;
    }
}

export async function getGroupPosts(groupId: string) {
    const API_URL = getApiUrl();
    try {
        const response = await fetch(`${API_URL}/posts/groups/${groupId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Gruppenbeiträge");
        }

        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Gruppenbeiträge:", err);
        throw err;
    }
}
