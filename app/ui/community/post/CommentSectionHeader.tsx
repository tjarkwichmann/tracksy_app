import { ArrowLeftIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface CommentSectionHeaderProps {
    commentsLenght: number;
    handleCommentSectionToggle: () => void;
}

export default function CommentSectionHeader({
    commentsLenght,
    handleCommentSectionToggle,
}: CommentSectionHeaderProps) {
    return (
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <ArrowLeftIcon
                className="h-6 w-6 text-gray-600 cursor-pointer"
                onClick={() => handleCommentSectionToggle()}
            />
            <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Kommentare</h3>
            <span className="text-sm text-gray-500">({commentsLenght})</span>
        </div>
    );
}
