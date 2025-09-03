import { XMarkIcon } from "@heroicons/react/24/outline";
import { Exercise } from "@/lib/definitions";

interface ExerciseSelectionPopupProps {
    isVisible: boolean;
    exercises: Exercise[];
    searchTerm: string;
    onClose: () => void;
    onSearchChange: (term: string) => void;
    onExerciseSelect: (exercise: Exercise) => void;
}

/**
 *
 * @param param0 - Props für die ExerciseSelectionPopup-Komponente
 * @param param0.isVisible - Steuert die Sichtbarkeit des Popups
 * @param param0.exercises - Liste der verfügbaren Übungen
 * @param param0.searchTerm - Suchbegriff für die Übungen
 * @param param0.onClose - Funktion zum Schließen des Popups
 * @param param0.onSearchChange - Funktion zum Aktualisieren des Suchbegriffs
 * @param param0.onExerciseSelect - Funktion, die aufgerufen wird, wenn eine Übung ausgewählt wird
 * @returns Zeigt ein Popup an, in dem der Benutzer eine Übung auswählen kann. Umfasst eine Suchleiste und eine Liste von Übungen.
 */
export default function ExerciseSelectionPopup({
    isVisible,
    exercises,
    searchTerm,
    onClose,
    onSearchChange,
    onExerciseSelect,
}: ExerciseSelectionPopupProps) {
    const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        isVisible && (
            <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] flex flex-col border border-gray-100">
                    {/* Header mit Close Button */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Übung auswählen</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Übung suchen..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50 focus:bg-white transition-colors"
                    />

                    {/* Exercise List */}
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {filteredExercises.map((exercise) => (
                            <button
                                key={exercise.id}
                                onClick={() => onExerciseSelect(exercise)}
                                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-blue-25 hover:shadow-md">
                                <div className="font-semibold text-gray-800 hover:text-blue-800">{exercise.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{exercise.description}</div>
                            </button>
                        ))}

                        {filteredExercises.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p className="text-gray-600 font-medium">Keine Übungen gefunden</p>
                                <p className="text-sm text-gray-400 mt-1">Versuchen Sie einen anderen Suchbegriff</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
