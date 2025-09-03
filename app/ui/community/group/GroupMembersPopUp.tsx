import { XMarkIcon } from "@heroicons/react/24/outline";

interface GroupMembersPopUpProps {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    onClose: () => void;
    members: { id: number; name: string; level: number; email }[];
    ownerId: number;
}

/**
 *
 * @param param0 - Props für die GroupMembersPopUp-Komponente
 * @param param0.isVisible - Steuert die Sichtbarkeit des Popups
 * @param param0.onClose - Callback-Funktion, die aufgerufen wird, wenn das Popup geschlossen wird
 * @param param0.members - Liste der Mitglieder der Gruppe, die angezeigt werden sollen
 * @param param0.setIsVisible - Funktion zum Setzen der Sichtbarkeit des Popup
 * @param param0.ownerId - ID des Gruppenerstellers, um den Gruppenadmin hervorzuheben
 * @returns Komponente, die ein Popup anzeigt, in dem die Mitglieder einer Gruppe aufgelistet sind
 */
export default function GroupMembersPopUp({
    isVisible,
    onClose,
    members,
    setIsVisible,
    ownerId,
}: GroupMembersPopUpProps) {
    return (
        isVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                onClose();
                            }}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Gruppenmitglieder</h2>
                    <ul className="space-y-2">
                        {members.map((member) => (
                            <li
                                key={member.id}
                                className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-white rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {member.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-700 font-medium">{member.name}</span>
                                        {member.id === ownerId && (
                                            <span className="text-xs text-blue-500">Gruppenadmin</span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">Level {member.level}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    );
}
