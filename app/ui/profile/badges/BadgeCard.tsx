import { StarIcon } from "@heroicons/react/24/solid";

/**
 *
 * @param param0 - Props für die BadgeCard-Komponente
 * @param param0.badge - Badge-Objekt, das die Informationen zum Abzeichen enthält
 * @param param0.IconComponent - Komponente, die das Abzeichen-Symbol darstellt
 * @param param0.isLocked - Boolean, der angibt, ob das Abzeichen gesperrt ist
 * @param param0.isLocked - Boolean, der angibt, ob das Abzeichen gesperrt ist
 * @returns BadgeCard-Komponente, die ein eimzelnes Abzeichen anzeigt
 */
export default function BadgeCard({ badge, IconComponent, isLocked = false }) {
    return (
        <div
            className={`rounded-xl bg-white p-4 shadow-sm border border-gray-100 ${
                isLocked ? "opacity-60" : "hover:shadow-md transition-shadow"
            }`}>
            <div className="flex flex-col items-center text-center">
                <div
                    className={`mb-3 rounded-full p-3 ${
                        isLocked
                            ? "bg-gray-100"
                            : badge.type === "milestone"
                              ? "bg-gradient-to-r from-blue-100 to-blue-200"
                              : "bg-gradient-to-r from-purple-100 to-purple-200"
                    }`}>
                    <IconComponent
                        className={`h-6 w-6 ${
                            isLocked
                                ? "text-gray-400"
                                : badge.type === "milestone"
                                  ? "text-blue-600"
                                  : "text-purple-600"
                        }`}
                    />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{badge.title}</h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{badge.description}</p>
                <div className="flex items-center gap-1">
                    <StarIcon className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs font-medium text-gray-600">{badge.xp_reward} XP</span>
                </div>
            </div>
        </div>
    );
}
