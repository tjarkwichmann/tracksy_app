interface WorkoutTrackerHeaderProps {
    showSavePopup: () => void;
}

/**
 *
 * @param param0 - Props für die WorkoutTrackerHeader-Komponente
 * @param param0.showSavePopup - Funktion, die das Popup zum Speichern des Workouts anzeigt
 * @returns Komponente für den Header des Workout-Trackers
 * Zeigt den Titel "Workout Tracker" und einen Button zum Beenden des Workouts an
 */
export default function WorkoutTrackerHeader({ showSavePopup }: WorkoutTrackerHeaderProps) {
    return (
        <div className="w-full fixed top-0 left-0 right-0 p-4 rounded-b-lg border-b-2 border-b-blue-200 bg-gradient-to-r from-blue-50 to-gray-100 z-50 flex justify-between items-center">
            <h1 className="text-lg font-bold text-black">Workout Tracker</h1>
            <button
                onClick={() => showSavePopup()}
                className="p-2 px-4 rounded-lg bg-green-400 font-semibold text-white transition hover:scale-105 duration-200 hover:cursor-pointer ">
                Workout beenden
            </button>
        </div>
    );
}
