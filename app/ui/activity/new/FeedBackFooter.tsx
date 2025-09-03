import { useRouter } from "next/navigation";

/**
 *
 * @returns JSX-Komponente für den Footer des Feedbacks nach einer Aktivität
 * Zeigt zwei Buttons an: einen zum Zurück zum Dashboard und einen zum Starten einer neuen Aktivität.
 * Außerdem wird eine motivierende Nachricht angezeigt, die den Nutzer etwas anfeuern soll :)
 */
export default function FeedBackFooter() {
    const router = useRouter();
    return (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-3">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                    Zum Dashboard
                </button>
                <button
                    onClick={() => router.push("/activity")}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-colors">
                    Neue Aktivität
                </button>
            </div>
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Weiter so! Jeder Schritt bringt dich deinem Ziel näher.</p>
            </div>
        </div>
    );
}
