import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { WorkoutExercise } from "@/lib/definitions";

interface ExerciseListProps {
    workoutExercises: WorkoutExercise[];
    removeExercise: (id: string) => void;
    addSet: (exerciseId: string) => void;
    removeSet: (exerciseId: string, setId: string) => void;
    updateSet: (
        exerciseId: string,
        setId: string,
        field: "weight" | "reps" | "completed",
        value: string | boolean
    ) => void;
}

/**
 *
 * @param param0 - Props für die ExerciseList-Komponente
 * @param param0.workoutExercises - Liste der Übungen im Workout, jede mit Name, Sätzen und Wiederholungen
 * @param param0.removeExercise - Funktion zum Entfernen einer Übung aus dem Workout
 * @param param0.addSet - Funktion zum Hinzufügen eines neuen Satzes zu einer Übung
 * @param param0.removeSet - Funktion zum Entfernen eines Satzes aus einer Übung
 * @param param0.updateSet - Funktion zum Aktualisieren eines Satzes einer Übung
 * @returns Kompoentente, die Übungen während des Workouts anzeigt
 * Zeigt die Übungen mit ihren Sätzen an und dazu das Gewicht und die Wiederholungen.
 */
export default function ExerciseList({
    workoutExercises,
    removeExercise,
    addSet,
    removeSet,
    updateSet,
}: ExerciseListProps) {
    return (
        <div className="space-y-6 flex-1">
            {workoutExercises.map((exercise) => (
                <div
                    key={exercise.id}
                    className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
                        <button
                            onClick={() => removeExercise(exercise.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200">
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Sets */}
                    <div className="space-y-3 mb-4">
                        <div className="grid grid-cols-4 gap-2 text-sm font-semibold justify-between text-gray-600 px-2">
                            <span>Satz</span>
                            <span>kg</span>
                            <span>Wdh.</span>
                        </div>

                        {exercise.sets.map((set, index) => (
                            <div key={set.id} className="grid grid-cols-4 gap-2 items-center">
                                <span className="text-center font-mono text-gray-600">{index + 1}</span>

                                <input
                                    type="number"
                                    placeholder="0"
                                    value={set.weight}
                                    onChange={(e) => updateSet(exercise.id, set.id, "weight", e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-center bg-blue-50 focus:bg-white transition-colors"
                                />

                                <input
                                    type="number"
                                    placeholder="0"
                                    value={set.reps}
                                    onChange={(e) => updateSet(exercise.id, set.id, "reps", e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-center bg-blue-50 focus:bg-white transition-colors"
                                />

                                <div className="flex items-center justify-center gap-2 ml-3">
                                    {exercise.sets.length > 1 && (
                                        <button
                                            onClick={() => removeSet(exercise.id, set.id)}
                                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200">
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => addSet(exercise.id)}
                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium">
                        <PlusIcon className="h-4 w-4" />
                        Satz hinzufügen
                    </button>
                </div>
            ))}
            {workoutExercises.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg font-medium text-gray-600 mb-2">Noch keine Übungen hinzugefügt</p>
                    <p className="text-gray-400">Klicken Sie auf "Übung hinzufügen" um zu beginnen</p>
                </div>
            )}
        </div>
    );
}
