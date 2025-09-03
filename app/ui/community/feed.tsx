import { Post } from "@/lib/definitions";
import PostComponent from "@/ui/community/post/PostComponent";

interface FeedProps {
    posts: Post[];
}

/**
 *
 * @param param0 - Props für die Feed-Komponente, die eine Liste von Beiträgen enthält
 * @param param0.posts - Array von Beiträgen, die im Feed angezeigt werden sollen
 * @returns Listen-Komponente von Beiträgen, die im Feed angezeigt werden
 */
export default function Feed({ posts }: FeedProps) {
    posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
                {posts.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Keine Beiträge gefunden. Sei der Erste, der etwas teilt!
                    </div>
                ) : (
                    posts.map((post) => <PostComponent key={post.id} postData={post} />)
                )}
            </div>
        </div>
    );
}
