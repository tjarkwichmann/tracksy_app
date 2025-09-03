import { CheckBadgeIcon, XMarkIcon, ClockIcon, FireIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { WorkoutProp } from "@/lib/definitions";

type WorkoutFeedbackHeaderProps = {
    workout: WorkoutProp["workout"];
};

/**
 *
 * @param param0 - Props für die WorkoutFeedbackHeader-Komponente
 * @param param0.workout - Enthält die Details des Workouts, einschließlich Dauer, verdienten XP und Anzahl der Sätze
 * @returns Header-Komponente für das Workout-Feedback
 */
export default function WorkoutFeedbackHeader({ workout }: WorkoutFeedbackHeaderProps) {
    const router = useRouter();

    const totalSets = workout.sets.length;

    return (
        <section className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                            <CheckBadgeIcon className="h-8 w-8 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Workout beendet!</h2>
                            <p className="text-green-100">Gut gemacht!</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="text-white hover:text-green-200 transition-colors p-1">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <ClockIcon className="h-5 w-5 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{Math.floor(workout.duration / 60)}</div>
                        <div className="text-sm text-green-100">Minuten</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <FireIcon className="h-5 w-5 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{workout.xp_earned}</div>
                        <div className="text-sm text-green-100">XP</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <TrophyIcon className="h-5 w-5 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{totalSets}</div>
                        <div className="text-sm text-green-100">Sätze</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
