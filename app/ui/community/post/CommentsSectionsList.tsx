import { formatDateWithDayAndTime } from "@/lib/utils";

interface CommentsListProps {
    comments: Array<{
        id: string;
        user_id: string;
        user_name: string;
        content: string;
        created_at: string;
    }>;
}

export default function CommentsSectionList({ comments }: CommentsListProps) {
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div
                    key={`comment-${comment.id}-${comment.created_at}`}
                    className="group p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                                {getInitials(comment.user_name)}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">{comment.user_name}</span>
                                <span className="text-xs text-gray-500">
                                    {formatDateWithDayAndTime(comment.created_at)}
                                </span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
