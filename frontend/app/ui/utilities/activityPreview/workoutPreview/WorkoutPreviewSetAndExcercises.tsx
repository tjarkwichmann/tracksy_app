import { getExerciseById } from "@/lib/data/excercises";
import useSWR from "swr";
import { SetWithoutSetId } from "@/lib/definitions";

type WorkoutPreviewSetsAndExcersisesProps = {
    exerciseIds: string[];
    exerciseMap: { [exerciseId: string]: SetWithoutSetId[] };
};

const fetchExerciseNames = async (exerciseIds: string[]) => {
    const entries = await Promise.all(
        exerciseIds.map(async (exerciseId) => {
            const exercise = await getExerciseById(exerciseId);
            return [exerciseId, exercise.name || "Unbekannt"];
        })
    );
    return Object.fromEntries(entries);
};

export default function WorkoutPreviewSetsAndExcersises({
    exerciseIds,
    exerciseMap,
}: WorkoutPreviewSetsAndExcersisesProps) {
    const exerciseCount = exerciseIds.length;
    const { data: exerciseNames = {}, isLoading: isExerciseNamesLoading } = useSWR(
        exerciseIds.length > 0 ? ["exerciseNames", ...exerciseIds] : null,
        () => fetchExerciseNames(exerciseIds)
    );

    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
                {exerciseCount} {exerciseCount === 1 ? "Übung" : "Übungen"}
            </h4>

            {isExerciseNamesLoading ? (
                <div className="space-y-2">
                    {[...Array(Math.min(3, exerciseCount))].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-1">
                    {Object.entries(exerciseMap)
                        .slice(0, 3)
                        .map(([exerciseId, sets]) => (
                            <div key={exerciseId} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-700">{exerciseNames[exerciseId] || "Lädt..."}</span>
                                </div>
                                <span className="text-gray-500 font-medium">
                                    {sets.length} {sets.length === 1 ? "Satz" : "Sätze"}
                                </span>
                            </div>
                        ))}

                    {exerciseCount > 3 && (
                        <div className="text-xs text-gray-500 mt-2">
                            +{exerciseCount - 3} weitere {exerciseCount - 3 === 1 ? "Übung" : "Übungen"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
