interface RunTimerProps {
    elapsedTime: number;
    isPaused?: boolean;
    isRunning?: boolean;
}

/**
 *
 * @param param0 - Props für die RunTimer-Komponente
 * @param param0.elapsedTime - Verstrichene Zeit in Sekunden
 * @param param0.isPaused - Gibt an, ob der Timer pausiert ist
 * @param param0.isRunning - Gibt an, ob der Timer läuft
 * @returns Kompeente zum Zeit anzeigen während des Laufs
 */
export default function RunTimer({ elapsedTime, isPaused, isRunning }: RunTimerProps) {
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-2">{formatTime(elapsedTime)}</div>
            <div className="text-lg text-gray-600">{isPaused ? "Pausiert" : isRunning ? "Läuft" : "Bereit"}</div>
        </div>
    );
}
