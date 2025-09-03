export function getApiUrl() {
    if (typeof window !== "undefined") {
        return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    } else {
        return process.env.API_URL_INTERNAL || "http://localhost:8000";
    }
}
