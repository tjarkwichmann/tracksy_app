import BadgeSection from "@/ui/profile/badges/BadgeSection";
import { getBadgeIcon } from "@/lib/utils";
import { WorkoutExercise, WorkoutProp } from "@/lib/definitions";

type WorkoutFeedbackBodyProps = {
    workout: WorkoutProp["workout"];
    earnedBadges?: {
        id: string;
        title: string;
        description: string;
        xp_reward: number;
        type: string;
    }[];
    exercises: WorkoutExercise[];
};

/**
 *
 * @param param0 - Props für die WorkoutFeedbackBody-Komponente
 * @param param0.workout - Enthält die Details des Workouts, einschließlich Start- und Endzeit, Dauer, verdienten XP und Benutzer-ID
 * @param param0.exercises - Enthält die Übungen, die im Workout durchgeführt wurden,
 *                             einschließlich Name, Beschreibung, Sätze und Wiederholungen
 * @param param0.earnedBadges - Enthält die verdienten Badges des Benutzers, die im Feedback angezeigt werden
 * @returns Kompoente die den Hauptinhalt des Workout-Feedbacks anzeigt
 * Zeigt die Gesamtstatistiken des Workouts an, einschließlich Gesamtvolumen und durchschnittlichem Gewicht.
 * Listet die Übungen und deren Sätze auf, einschließlich Gewicht und Wiederholungen.
 * Zeigt auch verdiente Abzeichen an, falls vorhanden.
 */
export default function WorkoutFeedbackBody({ workout, exercises, earnedBadges }: WorkoutFeedbackBodyProps) {
    const totalVolume = workout.sets.reduce((sum, set) => sum + set.weight * set.reps, 0);
    const averageWeight =
        workout.sets.length > 0
            ? workout.sets.reduce((sum, set) => sum + (set.weight || 0), 0) / workout.sets.length
            : 0;

    const exerciseGroups = exercises
        .map((exercise) => ({
            exercise,
            sets: workout.sets.filter((set) => set.exercise_id === exercise.exerciseId),
        }))
        .filter((group) => group.sets.length > 0);

    return (
        <div className="p-6 overflow-y-auto max-h-96">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Workout vom{" "}
                    {new Date(workout.start_time).toLocaleDateString("de-DE", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                    })}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="text-sm text-blue-600 font-medium">Gesamtvolumen</div>
                        <div className="text-2xl font-bold text-blue-800">{Math.round(totalVolume)}</div>
                        <div className="text-xs text-blue-600">kg × Wdh.</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                        <div className="text-sm text-orange-600 font-medium">Ø Gewicht</div>
                        <div className="text-2xl font-bold text-orange-800">{Math.round(averageWeight)}</div>
                        <div className="text-xs text-orange-600">kg pro Satz</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Übungen Details</h4>

                {exerciseGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            {group.exercise.name}
                        </h5>

                        <div className="space-y-2">
                            {group.sets.map((set, setIndex) => (
                                <div
                                    key={setIndex}
                                    className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-gray-100">
                                    <span className="text-sm font-medium text-gray-600">Satz {setIndex + 1}</span>
                                    <div className="flex gap-4 text-sm">
                                        <span className="font-semibold text-gray-800">{set.weight} kg</span>
                                        <span className="text-gray-600">×</span>
                                        <span className="font-semibold text-gray-800">{set.reps} Wdh.</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>
                                    Volumen:{" "}
                                    {Math.round(
                                        group.sets.reduce((sum, set) => sum + (set.weight || 0) * (set.reps || 0), 0)
                                    )}{" "}
                                    kg×Wdh.
                                </span>
                                <span>{group.sets.length} Sätze</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {earnedBadges && earnedBadges.length > 0 && (
                <BadgeSection
                    title="Verdiente Abzeichen"
                    badges={earnedBadges}
                    getBadgeIcon={getBadgeIcon}
                    isLocked={false}
                />
            )}
        </div>
    );
}
