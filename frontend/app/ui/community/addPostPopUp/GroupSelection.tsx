"use client";

import { UsersIcon } from "@heroicons/react/24/outline";

/**
 * * @param groups - Liste der verfügbaren Gruppen
 * * @param isOpen - Steuert die Sichtbarkeit der Gruppenauswahl
 * * @param setIsOpen - Funktion zum Setzen der Sichtbarkeit der Gruppenauswahl
 * * @param selectedGroup - Die aktuell ausgewählte Gruppe
 * * @param setSelectedGroup - Funktion zum Setzen der aktuell ausgewählten Gruppe
 * * @returns Komponente zur Auswahl einer Gruppe für einen Post
 *  Auswahl einer Gruppe, in der der Post veröffentlicht werden soll.
 */
interface GroupSelectionProps {
    groups: { name: string; description: string; owner_id: string; id: string }[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectedGroup: { name: string; description: string; id: string; owner_id: string } | null;
    setSelectedGroup: (group: { name: string; description: string; id: string; owner_id: string } | null) => void;
}

export default function GroupSelection({
    groups,
    setIsOpen,
    selectedGroup,
    isOpen,
    setSelectedGroup,
}: GroupSelectionProps) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <UsersIcon className="w-6 h-6" />
                <span>In Gruppe posten (optional)</span>
            </label>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white text-left">
                    {selectedGroup ? `Gruppe • ${selectedGroup.name}` : "Gruppe auswählen..."}
                </button>
                {isOpen &&
                    (groups.length === 0 ? (
                        <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg p-4 border border-gray-200 mt-1 z-50">
                            <p className="text-gray-500">Keine Gruppen gefunden. Bitte erstelle eine Gruppe.</p>
                        </div>
                    ) : (
                        <div className="absolute top-full left-0 right-0 bg-white max-h-64 overflow-y-auto w-full rounded-lg shadow-lg z-50 p-4 space-y-4 border border-gray-200 mt-1">
                            {groups.map((group) => (
                                <button
                                    key={group.id}
                                    onClick={() => {
                                        setSelectedGroup(group);
                                        setIsOpen(false);
                                    }}
                                    className="p-3 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                                    {group.name} •{" "}
                                </button>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
}
