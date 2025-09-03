import { MapPinIcon } from "@heroicons/react/24/outline";

interface SpeedDisplayProps {
    isVisible: boolean;
    currentSpeed: number;
}

/**
 *
 * @param param0 - Props für die SpeedDisplay-Komponente
 * @param param0.isVisible - Steuert die Sichtbarkeit der Geschwindigkeitsanzeige
 * @param param0.currentSpeed - Aktuelle Geschwindigkeit des Benutzers Pace
 * @returns
 */
export default function SpeedDisplay({ isVisible, currentSpeed }: SpeedDisplayProps) {
    if (!isVisible) {
        return null;
    }
    return (
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-600">Aktueller Pace</span>
                </div>
            </div>
            <div className="text-xl font-bold text-orange-500">{currentSpeed.toFixed(1)} min/km</div>
        </div>
    );
}
