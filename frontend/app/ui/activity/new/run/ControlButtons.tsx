import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/24/outline";

interface ControlButtonsProps {
    isRunning: boolean;
    isPaused: boolean;
    showSavePopup: () => void;
    handleStart: () => void;
    handlePause: () => void;
    handleResume: () => void;
}

/**
 *
 * @param param0 - Props für die ControlButtons-Komponente
 * @param param0.isRunning - Gibt an, ob die Aktivität läuft
 * @param param0.isPaused - Gibt an, ob die Aktivität pausiert ist
 * @param param0.showSavePopup - Funktion, die das Popup zur Bestätigung des Speicherns anzeigt
 * @param param0.handleStart - Funktion, die aufgerufen wird, wenn der Start-Knopf gedrückt wird
 * @param param0.handlePause - Funktion, die aufgerufen wird, wenn der Pause-Knopf gedrückt wird
 * @param param0.handleResume - Funktion, die aufgerufen wird, wenn der Weiter-Knopf gedrückt wird
 * @returns JSX-Komponente, die die Steuerungsknöpfe für die Aktivität anzeigt
 * Zeigt Start, Pause/Weiter und Beenden-Knöpfe an, abhängig vom Status der Aktivität.
 */
export default function ControlButtons({
    isRunning,
    isPaused,
    showSavePopup,
    handleStart,
    handlePause,
    handleResume,
}: ControlButtonsProps) {
    return (
        <div className="flex justify-center gap-4">
            {!isRunning ? (
                <button
                    onClick={() => handleStart()}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-white font-semibold shadow-lg transition-all transform hover:scale-105">
                    <PlayIcon className="w-6 h-6" />
                    Start
                </button>
            ) : (
                <>
                    {!isPaused ? (
                        <button
                            onClick={() => handlePause()}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-4 rounded-full text-white font-semibold shadow-lg transition-all">
                            <PauseIcon className="w-5 h-5" />
                            Pause
                        </button>
                    ) : (
                        <button
                            onClick={() => handleResume()}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-4 rounded-full text-white font-semibold shadow-lg transition-all">
                            <PlayIcon className="w-5 h-5" />
                            Weiter
                        </button>
                    )}

                    <button
                        onClick={() => showSavePopup()}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-4 rounded-full text-white font-semibold shadow-lg transition-all">
                        <StopIcon className="w-5 h-5" />
                        Beenden
                    </button>
                </>
            )}
        </div>
    );
}
