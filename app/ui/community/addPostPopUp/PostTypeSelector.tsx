import { CameraIcon, BoltIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface PostTypeSelectorProps {
    selectedType: "text" | "workout" | "run";
    setSelectedType: (type: "text" | "workout" | "run") => void;
}

/**
 *
 * @param param0 - Props für die PostTypeSelector-Komponente
 * @param param0.selectedType - Der aktuell ausgewählte Post-Typ (Nur Text oder mit verknüpften Workout oder Lauf)
 * @param param0.setSelectedType - Funktion zum Setzen des ausgewählten Post-Typs
 * @returns Komponente zur Auswahl des Post-Typs
 */
export default function PostTypeSelector({ selectedType, setSelectedType }: PostTypeSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Post-Typ</label>
            <div className="flex space-x-2">
                <button
                    onClick={() => setSelectedType("text")}
                    className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all ${
                        selectedType === "text"
                            ? "border-gray-500 bg-gray-100 text-gray-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}>
                    <CameraIcon className="w-8 h-8" />
                    <span className="font-medium">Text</span>
                </button>
                <button
                    onClick={() => setSelectedType("workout")}
                    className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all ${
                        selectedType === "workout"
                            ? "border-blue-500 bg-blue-50 text-blue-500"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}>
                    <BoltIcon className="w-8 h-8" />
                    <span className="font-medium">Workout</span>
                </button>
                <button
                    onClick={() => setSelectedType("run")}
                    className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all ${
                        selectedType === "run"
                            ? "border-orange-500 bg-orange-50 text-orange-500"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}>
                    <MapPinIcon className="w-8 h-8" />
                    <span className="font-medium">Lauf</span>
                </button>
            </div>
        </div>
    );
}
