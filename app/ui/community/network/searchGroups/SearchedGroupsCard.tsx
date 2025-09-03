import { UserMinusIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";

type SearchGroupsProps = {
    group: {
        id: string;
        name: string;
        description: string;
        owner_id: string;
        member_count?: number;
    };
    isMember: (groupId: string) => boolean;
    handleJoinGroup: (groupId: string) => void;
    handleLeaveGroup: (groupId: string) => void;
};

/**
 *
 * @param param0 - Props für die SearchedGroupsCard-Komponente
 * @param param0.group - Die Gruppe, die angezeigt werden soll
 * @param param0.isMember - Funktion, die überprüft, ob der aktuelle Benutzer Mitglied der Gruppe ist
 * @param param0.handleJoinGroup - Funktion, die aufgerufen wird, wenn der Benutzer der Gruppe beitreten möchte
 * @param param0.handleLeaveGroup - Funktion die aufgerufen wird, wenn der Benutzer die Gruppe verlassen möchte
 * @returns Komponente, die eine Gruppe in der Suchergebnisliste anzeigt
 */
export default function SearchedGroupsCard({ group, isMember, handleJoinGroup, handleLeaveGroup }: SearchGroupsProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 relative">
                    <UsersIcon className="h-6 w-6 text-white" />
                    {isMember(group.id) && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800 truncate">{group.name}</h3>
                        {isMember(group.id) && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Mitglied</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{group.description}</p>
                </div>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
                {isMember(group.id) ? (
                    <button
                        onClick={() => handleLeaveGroup(group.id)}
                        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto flex-shrink-0 min-h-[44px] text-sm sm:text-base">
                        <UserMinusIcon className="h-4 w-4" />
                        <span className="whitespace-nowrap">Verlassen</span>
                    </button>
                ) : (
                    <button
                        onClick={() => handleJoinGroup(group.id)}
                        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto flex-shrink-0 min-h-[44px] text-sm sm:text-base">
                        <UserPlusIcon className="h-4 w-4" />
                        <span className="whitespace-nowrap">Beitreten</span>
                    </button>
                )}
            </div>
        </div>
    );
}
