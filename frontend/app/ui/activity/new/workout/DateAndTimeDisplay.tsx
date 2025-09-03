import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
interface DateAndTimeDisplayProps {
    today: string;
    elapsed: string;
}

/**
 *
 * @param param0 - Props für die DateAndTimeDisplay-Komponente
 * @param param0.today - Aktuelles Datum im Format "DD.MM.YYYY"
 * @param param0.elapsed - Verstrichene Zeit im Format "HH:MM:SS"
 * @returns Zeigt das aktuelle Datum und die verstrichene Zeit während des Trainings an
 */
export default function DateAndTimeDisplay({ today, elapsed }: DateAndTimeDisplayProps) {
    return (
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                <span>{today}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <ClockIcon className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-mono">{elapsed}</span>
            </div>
        </div>
    );
}
