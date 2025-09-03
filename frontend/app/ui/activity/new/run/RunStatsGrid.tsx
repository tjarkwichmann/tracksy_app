interface RunStatsGridProps {
    distance: number;
    averageSpeed: number;
}

/**
 *
 * @param param0 - Props für die RunStatsGrid-Komponente
 * @param param0.distance - Distanz des Laufs in Kilometern
 * @param param0.averageSpeed - Durchschnittliche Geschwindigkeit des Laufs in km/h
 * @returns JSX-Komponente, die Laufstatistiken
 * Zeigt die Distanz und die durchschnittliche Geschwindigkeit des Laufs an.
 */
export default function RunStatsGrid({ distance, averageSpeed }: RunStatsGridProps) {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{distance.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Kilometer</div>
            </div>

            {/*<div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">
                    {averageSpeed > 0 ? averageSpeed.toFixed(1) : "Pace wird berechnet…"}
                </div>
                <div className="text-sm text-gray-600">durschn. Pace</div>
            </div>*/}
        </div>
    );
}
