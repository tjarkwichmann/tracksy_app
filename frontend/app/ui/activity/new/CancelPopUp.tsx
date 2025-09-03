interface CancelPopUpProps {
    activityType: "Lauf" | "Workout";
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

/**
 *
 * @param param0 - Props für die CancelPopUp-Komponente
 * @param param0.activityType - Typ der Aktivität, die abgebrochen werden soll
 * @param param0.isVisible - Steuert die Sichtbarkeit des Popups
 * @param param0.onCancel - Funktion, die aufgerufen wird, wenn der Benutzer das Abbrechen bestätigt
 * @param param0.onConfirm - Funktion, die aufgerufen wird, wenn
 * @returns Komponente, die ein Popup anzeigt, um den Benutzer zu fragen, ob er die Aktivität abbrechen möchte
 */
export default function CancelPopUp({ activityType, isVisible, onCancel, onConfirm }: CancelPopUpProps) {
    return (
        isVisible && (
            <div className="fixed inset-0 bg-gray-300 bg-opacity-90 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{`${activityType} abbrechen`}</h2>
                    <p className="text-gray-600 mb-4">
                        {`Sind Sie sicher, dass du dein ${activityType} abbrechen möchten? Alle Fortschritte gehen verloren.`}
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => onCancel()}
                            className="p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                            Abbrechen
                        </button>
                        <button
                            onClick={() => onConfirm()}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                            Ich bin mir sicher
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
