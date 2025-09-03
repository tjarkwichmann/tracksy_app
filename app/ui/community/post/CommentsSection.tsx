import React, { useEffect, useState } from "react";
import { getCommentsByPostId } from "@/lib/data/posts";
import { getUserById } from "@/lib/data/user";
import { commentOnPost } from "@/lib/actions";
import CommentSectionHeader from "./CommentSectionHeader";
import CommentsSectionList from "./CommentsSectionsList";
import NewCommentInput from "./NewCommentInput";

interface CommentsSectionProps {
    postId: string;
    isVisible: boolean;
    handleCommentSectionToggle: () => void;
    setCommentCount?: (count: number) => void;
}

export default function CommentsSection({
    postId,
    isVisible,
    handleCommentSectionToggle,
    setCommentCount,
}: CommentsSectionProps) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedComments = await getCommentsByPostId(postId);

                const commentsWithUserNames = await Promise.all(
                    fetchedComments.map(async (comment) => {
                        let user_name = "Unbekannt";
                        try {
                            const user = await getUserById(comment.user_id);
                            user_name = user?.name || user?.username || "Unbekannt";
                        } catch {}
                        return { ...comment, user_name };
                    })
                );
                setComments(commentsWithUserNames);
            } catch (error) {
                console.error("Fehler beim Abrufen der Kommentare:", error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const commentData = {
                post_id: postId,
                content: newComment,
            };

            const createdComment = await commentOnPost(commentData);

            let user_name = "Unbekannt";
            try {
                const user = await getUserById(createdComment.user_id);
                user_name = user?.name || user?.username || "Unbekannt";
            } catch {}

            setComments((prev) => [...prev, { ...createdComment, user_name }]);
            setNewComment("");
            setCommentCount(comments.length + 1);
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Kommentars:", error);
        }
    };

    return (
        isVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center min-w-screen max-h-screen overscroll-none bg-gray-200 bg-opacity-50 p-4">
                <div className="bg-white w-full max-w-2xl max-h-[80vh] rounded-lg shadow-sm border border-gray-200 p-6 space-y-6 overflow-y-auto">
                    <CommentSectionHeader
                        handleCommentSectionToggle={handleCommentSectionToggle}
                        commentsLenght={comments.length}
                    />

                    <CommentsSectionList comments={comments} />

                    <NewCommentInput
                        setNewComment={setNewComment}
                        newComment={newComment}
                        handleAddComment={handleAddComment}
                    />
                </div>
            </div>
        )
    );
}
