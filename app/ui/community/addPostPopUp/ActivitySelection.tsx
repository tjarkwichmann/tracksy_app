import { BoltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { formatDateWithDayAndTime } from "@/lib/utils";

interface ActivitySelectionProps {
    activities: { id: string; start_time: string; duration: string }[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selected: { id: string; start_time: string; duration: string } | null;
    setSelected: (activity: { id: string; start_time: string; duration: string } | null) => void;
    type: "Workout" | "Lauf";
}

/**
 * 
 * @param param0 - Props für die ActivitySelection-Komponente
 * @param param0.activities - Liste der verfügbaren Aktivitäten
 * @param param0.isOpen - Steuert die Sichtbarkeit der Aktivitätsauswahl
 * @param param0.setIsOpen - Funktion zum Setzen der Sichtbarkeit der Aktivitätsauswahl
 * @param param0.selected - Die aktuell ausgewählte Aktivität
 * @param param0.setSelected - Funktion zum Setzen der aktuell ausgewählten Aktivität
 * @param param0.type - Typ der Aktivität, entweder "Workout" oder "Lauf"
/** 
 * @returns Komponente zur Auswahl von Aktivitäten (Workout oder Lauf)
 */
export default function ActivitySelection({
    activities,
    isOpen,
    setIsOpen,
    selected,
    setSelected,
    type,
}: ActivitySelectionProps) {
    return (
        <div
            className={
                type === "Workout"
                    ? "space-y-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
                    : "space-y-4 p-4 bg-orange-50 rounded-xl border border-orange-200"
            }>
            <h3
                className={
                    type == "Workout"
                        ? "font-medium text-blue-800 flex items-center space-x-2"
                        : "font-medium text-orange-600 flex items-center space-x-2"
                }>
                {type === "Workout" ? <BoltIcon className="w-6 h-6" /> : <MapPinIcon className="w-6 h-6" />}
                <span>{`${type} `}</span>
            </h3>
            <div
                className={
                    type == "Workout"
                        ? "w-full p-3 border border-blue-200 rounded-lg  focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                        : "w-full p-3 border border-orange-200 rounded-lg  focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
                }>
                <button onClick={() => setIsOpen(!isOpen)} className="text-sm text-gray-600">
                    {selected
                        ? `${type} • ${formatDateWithDayAndTime(selected.start_time)} • ${selected.duration}`
                        : `${type} auswählen...`}
                </button>
            </div>
            {isOpen && (
                <div className="grid top-full bg-white max-h-64 overflow-y-auto transform  w-full max-w-md  rounded-lg shadow-lg z-60 p-4 space-y-4">
                    {activities.map((activity) => (
                        <button
                            className={
                                type === "Workout"
                                    ? "p-3  rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                                    : "p-3 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors"
                            }
                            onClick={() => {
                                setSelected(activity);
                                setIsOpen(false);
                            }}
                            key={activity.id}
                            value={activity.id}>
                            {type} • {formatDateWithDayAndTime(activity.start_time)} • {activity.duration}
                        </button>
                    ))}
                </div>
            )}
            {selected && (
                <div
                    className={
                        type === "Workout"
                            ? "p-3 bg-white rounded-lg border border-blue-200"
                            : "p-3 bg-white rounded-lg border border-orange-300"
                    }>
                    <div className={type == "Workout" ? "text-sm text-blue-700" : "text-sm text-orange-500"}>
                        ✓ {type} wird mit diesem Post verknüpft
                    </div>
                </div>
            )}
        </div>
    );
}
