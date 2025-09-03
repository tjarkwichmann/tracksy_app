import Link from "next/link";
import { PlayIcon, MapPinIcon, ClockIcon, BoltIcon } from "@heroicons/react/24/outline";

/**
 *
 * @returns JSX-Komponente für die Startseite des Lauf-Trackers
 */
export default function StartRun() {
    return (
        <main className=" min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center px-6">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6 shadow-lg">
                    <MapPinIcon className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Bereit für deinen Lauf?</h1>
            </div>

            <div className="w-full max-w-sm">
                <Link href="/activity/new/run">
                    <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                        <PlayIcon className="h-5 w-5" />
                        Lauf starten
                    </button>
                </Link>
            </div>

            <div className="mt-10 bg-white rounded-xl p-6 shadow max-w-md w-full">
                <h3 className="font-semibold text-gray-800 mb-3 text-center">Was wird getrackt:</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4 mr-2 text-fuchsia-500" />
                        Zeit & Pace
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                        GPS Route
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center max-w-md">
                <p className="text-lg font-medium text-gray-700 italic leading-relaxed">
                    "Jeder Schritt bringt dich deinem Ziel näher.
                    <br />
                    Starte jetzt deinen Lauf!"
                </p>
                <p className="text-xs text-gray-500 text-center mt-4">
                    Stelle sicher, dass GPS aktiviert ist und du eine stabile Internetverbindung hast.
                </p>
            </div>
        </main>
    );
}
