import { TrophyIcon, StarIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type AchievementsSectionProps = {
    achievedBadges: { id: string; title: string; xp_reward: number }[];
};

export default function ProfileBadgeSection({ achievedBadges }: AchievementsSectionProps) {
    return (
        <Link href="/profile/badges" className="block">
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-gradient-to-r from-organge-50 to-orange-100 p-3">
                            <TrophyIcon className="h-6 w-6 text-orange-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Deine Erfolge</h2>
                            <p className="text-sm text-gray-500">Entdecke deine Abzeichen</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600"></span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-orange-400">Alle Abzeichen ansehen</span>
                    <ArrowRightIcon className="h-4 w-4 text-orange-400" />
                </div>
            </div>
        </Link>
    );
}
