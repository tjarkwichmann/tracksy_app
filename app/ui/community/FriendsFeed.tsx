"use client";
import AddPostButton from "@/ui/community/AddPostButton";
import useSWR from "swr";
import { getPostsFromFriends } from "@/lib/data/posts";
import Feed from "@/ui/community/Feed";
import { useSession } from "next-auth/react";

/**
 *
 * @returns Feed-Komponente, die Beiträge von Freunden anzeigt.
 */
export default function FriendsFeed() {
    const { data: session, status } = useSession();
    const userId = session?.user?.id;

    const shouldFetch = status === "authenticated" && !!userId;

    const {
        data: posts,
        isLoading,
        mutate,
    } = useSWR(shouldFetch ? ["friendsFeed", userId] : null, () => getPostsFromFriends(userId!));

    const handlePostUpdate = () => {
        if (userId) {
            mutate();
        }
    };

    if (status === "loading" || isLoading) {
        return <div>Lade...</div>;
    }

    if (status === "unauthenticated") {
        return <div>Du musst angemeldet sein, um Beiträge von Freunden zu sehen.</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <AddPostButton onPostCreated={handlePostUpdate} />
            {posts && posts.length === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                    Es gibt noch keine Beiträge von deinen Freunden. Sei der Erste, der etwas teilt!
                </div>
            ) : (
                <Feed posts={posts || []} />
            )}
        </main>
    );
}
