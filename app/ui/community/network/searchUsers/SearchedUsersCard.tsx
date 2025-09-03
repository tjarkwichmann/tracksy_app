import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";

type SearchedUsersCardProps = {
    user: {
        id: string;
        name: string;
        email: string;
        level?: number;
        xp?: number;
    };
    isFriend: (userId: string) => boolean;
    handleAddFriend: (friendId: string) => Promise<void>;
    handleRemoveFriend: (friendId: string) => Promise<void>;
    addingFriendId?: string | null;
    removingFriendId?: string | null;
};

/**
 * 
 * @param param0 - Props für die SearchedUsersCard-Komponente
 * @param param0.user - Der Benutzer, der angezeigt werden soll
 * @param param0.isFriend - Funktion, die überprüft, ob der Benutzer ein Freund ist
 * @param param0.handleAddFriend - Funktion, die aufgerufen wird, wenn der Benutzer eine Freundschaftsanfrage senden möchte
 * @param param0.handleRemoveFriend - Funktion, die aufgerufen wird, wenn der Benutzer eine Freundschaftsanfrage zurückziehen möchte
 * @param param0.addingFriendId - ID des Benutzers, der gerade hinzugefügt wird (optional)
 * @param param0.removingFriendId - ID des Benutzers, der gerade entfernt wird (optional)
/**
 * @returns Komponente, die einen Benutzer in der Suchergebnisliste anzeigt
 */
export default function SearchedUsersCard({
    user,
    isFriend,
    handleAddFriend,
    handleRemoveFriend,
    addingFriendId,
    removingFriendId,
}: SearchedUsersCardProps) {
    return (
        <div
            key={user.id}
            className={`rounded-xl bg-white p-3 sm:p-4 shadow ${isFriend(user.id) ? "ring-2 ring-green-200 bg-green-50" : ""}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 relative">
                        <span className="text-white font-semibold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                        {isFriend(user.id) && (
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
                            {isFriend(user.id) && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Freund
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        {user.level && <p className="text-sm text-blue-600">Level {user.level}</p>}
                    </div>
                </div>

                {isFriend(user.id) ? (
                    <button
                        onClick={() => handleRemoveFriend(user.id)}
                        disabled={removingFriendId === user.id}
                        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto flex-shrink-0 min-h-[44px] text-sm sm:text-base">
                        <UserMinusIcon className="h-4 w-4" />
                        <span className="whitespace-nowrap">
                            {removingFriendId === user.id ? "Wird entfernt..." : "Entfolgen"}
                        </span>
                    </button>
                ) : (
                    <button
                        onClick={() => handleAddFriend(user.id)}
                        disabled={addingFriendId === user.id}
                        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto flex-shrink-0 min-h-[44px] text-sm sm:text-base">
                        <UserPlusIcon className="h-4 w-4" />
                        <span className="whitespace-nowrap">
                            {addingFriendId === user.id ? "Wird hinzugefügt..." : "Hinzufügen"}
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}
