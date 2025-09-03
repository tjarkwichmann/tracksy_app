import { CheckCircleIcon } from "@heroicons/react/24/solid";

type SelectGoalProps = {
    getGoalIcon: any;
    editData: any;
    setEditData: any;
    handleSave: any;
    handleCancel: any;
    goalTypes: any;
};

/**
 *
 * @param param0 - Props für die SelectGoal-Komponente
 * @param param0.getGoalIcon - Funktion, die das Icon für den Zieltyp zurückgibt
 * @param param0.editData - Objekt, das die aktuellen Daten des zu bearbeitenden Ziels enthält
 * @param param0.setEditData - Funktion zum Aktualisieren der editData
 * @param param0.handleSave - Funktion, die aufgerufen wird, wenn das Ziel gespeichert wird
 * @param param0.handleCancel - Funktion, die aufgerufen wird, wenn die Bearbeitung abgebrochen wird
 * @param param0.goalTypes - Array von Objekten, die die verfügbaren Zieltypen enthalten, mit `value` und `label` Eigenschaften
 * @returns
 */
export default function SelectGoal({
    getGoalIcon,
    editData,
    setEditData,
    handleSave,
    handleCancel,
    goalTypes,
}: SelectGoalProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full  p-2 bg-gradient-to-rp-3">{getGoalIcon(editData.type)}</div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Ziel bearbeiten</h2>
                    <p className="text-sm text-gray-500">Passe dein wöchentliches Ziel an</p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ziel-Typ</label>
                <div className="grid grid-cols-1 gap-2">
                    {goalTypes.map((type) => (
                        <label
                            key={type.value}
                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                editData.type === type.value
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}>
                            <input
                                type="radio"
                                name="goalType"
                                value={type.value}
                                checked={editData.type === type.value}
                                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                                className="sr-only"
                            />
                            <div className="mr-1">{getGoalIcon(type.value)}</div>

                            <span className="font-medium text-gray-800">{type.label}</span>
                            {editData.type === type.value && (
                                <CheckCircleIcon className="h-5 w-5 text-blue-500 ml-auto" />
                            )}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Häufigkeit pro Woche</label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="1"
                        max="7"
                        value={editData.frequency}
                        onChange={(e) => setEditData({ ...editData, frequency: parseInt(e.target.value) })}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full font-bold text-lg">
                        {editData.frequency}
                    </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1x</span>
                    <span>7x</span>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                    Speichern
                </button>
                <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    Abbrechen
                </button>
            </div>
        </div>
    );
}
