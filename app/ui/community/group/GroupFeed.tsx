"use client";

import { getGroupPosts } from "@/lib/data/posts";
import useSWR from "swr";
import Feed from "@/ui/community/Feed";
import AddPostButton from "@/ui/community/AddPostButton";

/**
 *
 * @param param0 - Id der Gruppe, deren Beiträge angezeigt werden sollen
 * @param param0.id - Die ID der Gruppe, deren Beiträge abgerufen werden sollen
 * @returns
 */
export default function GroupFeed({ id }) {
    const {
        data: posts = [],
        error,
        isLoading,
        mutate,
    } = useSWR(id ? ["groupFeed", id] : null, () => getGroupPosts(id));

    const handlePostUpdate = async () => {
        if (id) {
            mutate(["groupFeed", id]);
        }
    };

    if (isLoading) {
        return <div>Lade...</div>;
    }

    if (error) {
        return <div>Fehler beim Abrufen der Beiträge.</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50 mt-6 ">
            <div className="max-w-3xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Beiträge</h1>
            </div>
            {posts.length === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                    Keine Beiträge in dieser Gruppe. Sei der Erste, der etwas teilt!
                </div>
            ) : (
                <Feed posts={posts} />
            )}
            <AddPostButton onPostCreated={handlePostUpdate} />
        </main>
    );
}
