"use client";

import BadgeCard from "./BadgeCard";

/**
 *
 * @param param0 - Props für die BadgeSection-Komponente
 * @param param0.title - Titel der Badge-Sektion
 * @param param0.badges - Array von Badge-Objekten, die in dieser Sektion angezeigt werden sollen
 * @param param0.getBadgeIcon - Funktion, die das Icon für ein Badge basierend auf dem Titel zurückgibt
 * @param param0.isLocked - Boolean, der angibt, ob die Badges in dieser Sektion gesperrt sind
 * @returns Komponente, die eine Sektion mit Badges anzeigt
 */
export default function BadgeSection({ title, badges, getBadgeIcon, isLocked = false }) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">{title}</h2>
            <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => {
                    const IconComponent = getBadgeIcon(badge.title);
                    return <BadgeCard key={badge.id} badge={badge} IconComponent={IconComponent} isLocked={isLocked} />;
                })}
            </div>
        </section>
    );
}
