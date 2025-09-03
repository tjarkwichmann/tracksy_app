import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetchBadges } from "@/lib/utils";
import ProfileBadgeSection from "./ProfileBadgeSection";
import GoalSection from "./GoalSection";

/**
 *
 * @returns Kompente zur Auswahl des Ziel- oder Badges-Bereichs im Profil
 */
export default function GoalAndBadges() {
    const { data: session, status } = useSession();
    const userId = session?.user?.id;

    const { data, error, isLoading } = useSWR(userId && status === "authenticated" ? ["badges", userId] : null, () =>
        fetchBadges(userId!)
    );

    if (status === "loading") {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="animate-pulse">Session wird geladen...</div>
                </div>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="animate-pulse">Daten werden geladen...</div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Fehler</h1>
                        <p className="text-gray-600">Die Daten konnten nicht geladen werden.</p>
                        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!data) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Keine Daten</h1>
                        <p className="text-gray-600">Es konnten keine Abzeichen-Daten gefunden werden.</p>
                    </div>
                </div>
            </main>
        );
    }

    const { achievedBadges } = data;

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Ziele & Erfolge</h1>

                <GoalSection />

                <ProfileBadgeSection achievedBadges={achievedBadges} />
            </div>
        </main>
    );
}
