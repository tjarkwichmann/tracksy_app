import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface NewCommentInputProps {
    setNewComment: (comment: string) => void;
    newComment: string;
    handleAddComment: () => void;
}

export default function NewCommentInput({ setNewComment, newComment, handleAddComment }: NewCommentInputProps) {
    return (
        <div className="pt-4 border-t border-gray-100 space-y-3">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Einen Kommentar hinzufügen..."
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
            <div className="flex justify-end">
                <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                    <PaperAirplaneIcon className="w-4 h-4" />
                    Kommentar hinzufügen
                </button>
            </div>
        </div>
    );
}
