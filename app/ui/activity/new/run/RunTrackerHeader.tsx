import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface RunTrackerHeaderProps {
    showCancelPopup: () => void;
}

/**
 *
 * @param param0 - Props für die RunTrackerHeader-Komponente
 * @param param0.showCancelPopup - Funktion, die das Popup zum Abbrechen des Laufes anzeigt
 * @returns Header für den Lauf-Tracker
 */
export default function RunTrackerHeader({ showCancelPopup }: RunTrackerHeaderProps) {
    return (
        <div className="bg-orange-50  px-4 py-3 flex items-center justify-between">
            <button onClick={() => showCancelPopup()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Lauftracker</h1>
            <div className="w-10" />
        </div>
    );
}
