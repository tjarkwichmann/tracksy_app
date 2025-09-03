import ProfileBadgeSection from "@/ui/profile/badges/BadgeSection";
import { getBadgeIcon } from "@/lib/utils";
import dynamic from "next/dynamic";
import { RoutePoint } from "@/lib/definitions";

const MapComponent = dynamic(() => import("../MapComponent"), {
    ssr: false,
    loading: () => <p>Karte wird geladen...</p>,
});

type RunFeedbackBodyProps = {
    run: {
        start_time: string;
        distance: number; // km
        average_speed: number; // km/h
        route_points?: RoutePoint[];
    };
    earnedBadges?: {
        id: string;
        title: string;
        description: string;
        xp_reward: number;
        type: string;
    }[];
};

/**
 *
 * @param param0 - Props für die RunFeedbackBody-Komponente
 * @param param0.run - Enthält die Details des Laufs, einschließlich Startzeit, Distanz und durchschnittlicher Geschwindigkeit
 * @param param0.earnedBadges - Enthält die verdienten Badges des Benutzers, die im Feedback angezeigt werden sollen
 * @returns JsX-Komponente, die die Staktstiken des Laufs und die verdienten Badges anzeigt
 */
export default function RunFeedbackBody({ run, earnedBadges }: RunFeedbackBodyProps) {
    return (
        <section className="p-6 overflow-y-auto max-h-96">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Lauf vom{" "}
                    {new Date(run.start_time).toLocaleDateString("de-DE", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                    })}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-orange-50 p-4 rounded-xl">
                        <div className="text-sm text-orange-600 font-medium">Distanz</div>
                        <div className="text-2xl font-bold text-orange-700">{run.distance}</div>
                        <div className="text-xs text-orange-600">km</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="text-sm text-blue-600 font-medium">Ø Pace</div>
                        <div className="text-2xl font-bold text-blue-800">{run.average_speed.toFixed(1)}</div>
                        <div className="text-xs text-blue-600">pro Kilometer</div>
                    </div>
                </div>
            </div>
            <MapComponent
                position={[run.route_points[0].latitude, run.route_points[0].longitude]}
                route={run.route_points}
            />
            {earnedBadges && earnedBadges.length > 0 && (
                <ProfileBadgeSection
                    title="Verdiente Abzeichen"
                    badges={earnedBadges}
                    getBadgeIcon={getBadgeIcon}
                    isLocked={false}
                />
            )}
        </section>
    );
}
