import Link from "next/link";
import { PlayIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

/**
 *
 * @returns JSX-Komponente für die Startseite des Workout-Trackers
 */
export default function StartWorkout() {
    return (
        <main className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center px-6">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-300 to-indigo-500 rounded-full mb-6 shadow-lg">
                    <RocketLaunchIcon className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Bereit für dein Workout?</h1>
            </div>

            <div className="w-full max-w-sm">
                <Link href="/activity/new/workout">
                    <button className="w-full bg-gradient-to-r from-blue-300 to-indigo-500  text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                        <PlayIcon className="h-5 w-5" />
                        Workout starten
                    </button>
                </Link>
            </div>

            <div className="mt-16 text-center max-w-md">
                <p className="text-lg font-medium text-gray-700 italic leading-relaxed">
                    "Der beste Zeitpunkt zu beginnen war gestern.
                    <br />
                    Der zweitbeste ist jetzt."
                </p>
            </div>
        </main>
    );
}
