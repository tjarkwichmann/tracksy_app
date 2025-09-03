"use client";

import { Post } from "@/lib/definitions";
import { useState, useEffect, useMemo } from "react";

import { getLikesByPostId, getCommentsByPostId } from "@/lib/data/posts";
import { getUserById } from "@/lib/data/user";
import { getWorkoutById } from "@/lib/data/workouts";
import { getRunById } from "@/lib/data/runs";
import { likePost, deleteLike } from "@/lib/actions";
import CommentsSection from "@/ui/community/post/CommentsSection";
import { useSession } from "next-auth/react";
import PostComponentHeader from "@/ui/community/post/PostComponentHeader";
import InteractionsBar from "@/ui/community/post/Interactionsbar";
import WorkoutPreview from "../../utilities/activityPreview/workoutPreview/WorkoutPreview";
import RunPreview from "../../utilities/activityPreview/runPreview/RunPreview";
import useSWR from "swr";

interface PostProps {
    postData: Post;
    onPostCreated?: () => void;
}

export default function PostComponent({ postData }: PostProps) {
    const { data: session } = useSession();

    const [commentSectionOpen, setCommentSectionOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [postCreatorData, setPostCreatorData] = useState({ name: "Loading..." });
    const user_id = session?.user?.id;

    const { data: likes, mutate: mutateLikes } = useSWR(postData.id ? ["likes", postData.id] : null, () =>
        getLikesByPostId(postData.id)
    );

    const { data: comments } = useSWR(postData.id ? ["comments", postData.id] : null, () =>
        getCommentsByPostId(postData.id)
    );

    const { data: postCreator } = useSWR(postData.user_id ? ["user", postData.user_id] : null, () =>
        getUserById(postData.user_id)
    );

    const { data: workout } = useSWR(postData.workout_id ? ["workout", postData.workout_id] : null, () =>
        getWorkoutById(postData.workout_id)
    );

    const { data: run } = useSWR(postData.run_id ? ["run", postData.run_id] : null, () => getRunById(postData.run_id));

    useEffect(() => {
        if (postCreator && postCreator.id == user_id) {
            setPostCreatorData({ name: "Du" });
        } else if (postCreator) {
            setPostCreatorData(postCreator);
        } else {
            setPostCreatorData({ name: "Unbekannt" });
        }
    }, [postCreator, user_id]);

    useEffect(() => {
        setLikeCount(likes ? likes.length : 0);
        setIsLiked(likes?.some((like) => String(like.user_id) === String(user_id)) ?? false);
    }, [likes, user_id]);

    useEffect(() => {
        setCommentCount(comments ? comments.length : 0);
    }, [comments]);

    const handleLike = async () => {
        const newIsLiked = !isLiked;

        setIsLiked(newIsLiked);
        setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

        try {
            if (newIsLiked) {
                await likePost({ post_id: postData.id });
            } else {
                await deleteLike({ post_id: postData.id });
            }
            mutateLikes();
        } catch (error) {
            setIsLiked(!newIsLiked);
            setLikeCount((prev) => (newIsLiked ? prev - 1 : prev + 1));
            console.error("Like-Fehler:", error);
        }
    };

    const handleCommentSectionToggle = () => {
        setCommentSectionOpen((prev) => !prev);
    };

    const formattedDate = useMemo(() => {
        try {
            const date = new Date(postData.created_at);
            if (isNaN(date.getTime())) {
                return "Ungültiges Datum";
            }
            const day = date.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
            const time = date.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
            });
            return `${day} um ${time}`;
        } catch (error) {
            console.error("Date formatting error:", error);
            return "Datum nicht verfügbar";
        }
    }, [postData.created_at]);

    return (
        <article className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-sm border mb-6 border-gray-200 hover:shadow-md transition-shadow duration-200">
            <PostComponentHeader userName={postCreatorData.name} date={formattedDate} />

            <div className="px-5 pb-3">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{postData.content}</p>
            </div>

            {postData.workout_id && (
                <section className="rounded-xl bg-gradient-to-r from-blue-50 to-white space-y-3 bg-white  p-2">
                    <WorkoutPreview workout={workout} />
                </section>
            )}

            {postData.run_id && (
                <section className="rounded-xl bg-gradient-to-r from-blue-50 to-white space-y-3 bg-white  p-2">
                    <RunPreview run={run} />
                </section>
            )}

            <InteractionsBar
                isLiked={isLiked}
                likeCount={likeCount}
                commentCount={commentCount}
                handleLike={handleLike}
                handleCommentSectionToggle={handleCommentSectionToggle}
            />

            <CommentsSection
                postId={postData.id}
                isVisible={commentSectionOpen}
                handleCommentSectionToggle={handleCommentSectionToggle}
                setCommentCount={setCommentCount}
            />
        </article>
    );
}
