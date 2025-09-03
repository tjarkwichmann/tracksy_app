interface SavePopUpProps {
    activityType: "Lauf" | "Workout";
    onConfirm: () => void;
    onCancel: () => void;
    isVisible: boolean;
}

/**
 *
 * @param param0 - Props für die SavePopUp-Komponente
 * @param param0.activityType - Typ der Aktivität, die gespeichert werden soll (Lauf oder Workout)
 * @param param0.onConfirm - Funktion, die aufgerufen wird, wenn der Benutzer das Speichern bestätigt
 * @param param0.onCancel - Funktion, die aufgerufen wird, wenn der Benutzer das Speichern abbricht
 * @param param0.isVisible - Steuert die Sichtbarkeit des Popups
 * @returns Komponente, die ein Popup anzeigt, um den Benutzer zu fragen, ob er die Aktivität speichern möchte
 * Dieses Popup wird angezeigt, wenn der Benutzer die Aktiviät über einen der Buttons beenden möchte
 */
export default function SavePopUp({ activityType, onConfirm, onCancel, isVisible }: SavePopUpProps) {
    return (
        isVisible && (
            <div className="fixed inset-0 bg-gray-300 bg-opacity-90 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{`${activityType} speichern`}</h2>
                    <p className="text-gray-600 mb-4">{`Möchtest du dein ${activityType} speichern?`}</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => onCancel()}
                            className="p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:scale-105 hover:cursor-pointer transition-colors">
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
