/**
 *
 * @param param0 - Props für die FrequencyDisplay-Komponente
 * @param param0.goal - Das Zielobjekt, das die Häufigkeit und den Typ enthält
 * @param param0.progressPercentage - Der Fortschrittsprozentsatz, der die Erreichung des Ziels darstellt
 * @param param0.currentCount - Die aktuelle Anzahl der erreichten Ziele
 * @param param0.getGoalTypeLabel - Funktion, die den Typ des Ziels als Label zurückgibt
 * @returns Zeigt die Häufigkeit eines Ziels pro Woche an, einschließlich des Fortschrittsbalkens und dem aktuellen Stand.
 */
export default function FrequencyDisplay({ goal, progressPercentage, currentCount, getGoalTypeLabel }) {
    return (
        <section>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Häufigkeit pro Woche</span>
                    <span className="text-sm font-medium text-blue-600">{goal.frequency}x</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <p className="text-sm text-gray-700 text-center">
                    <span className="font-medium">Ziel: </span>
                    {goal.frequency}x {getGoalTypeLabel(goal.type).toLowerCase()} pro Woche &nbsp;|&nbsp;
                    <span className="font-medium">Erreicht: </span>
                    {currentCount}x
                </p>
            </div>
        </section>
    );
}
