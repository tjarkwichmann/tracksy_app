import { HeartIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

interface InteractionsBarProps {
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    handleLike: () => void;
    handleCommentSectionToggle?: () => void;
}

export default function InteractionsBar({
    isLiked,
    likeCount,
    commentCount,
    handleLike,
    handleCommentSectionToggle,
}: InteractionsBarProps) {
    return (
        <div className="px-4 py-3 border-t border-gray-50">
            <div className="flex items-center justify-around">
                <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 hover:cursor-pointer rounded-lg transition-colors`}>
                    <HeartIcon className={`w-5 h-5 ${isLiked ? "text-red-600" : "text-gray-600"}`} />
                    {likeCount > 0 && (
                        <span className={`text-sm ${isLiked ? "text-red-600" : "text-gray-600"}`}>{likeCount}</span>
                    )}
                </button>

                <button
                    onClick={handleCommentSectionToggle}
                    className="flex items-center space-x-2 px-4 py-2 hover:cursor-pointer rounded-lg transition-colors hover:bg-gray-50 text-gray-600">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    {commentCount > 0 && <span className="text-sm">{commentCount}</span>}
                </button>
            </div>
        </div>
    );
}
