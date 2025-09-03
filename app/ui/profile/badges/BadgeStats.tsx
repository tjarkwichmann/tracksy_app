export default function BadgeStats({ achievedCount, totalXP }) {
    return (
        <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                <div className="text-2xl font-bold">{achievedCount}</div>
                <div className="text-sm opacity-90">Verdient</div>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
                <div className="text-2xl font-bold">{totalXP}</div>
                <div className="text-sm opacity-90">XP gesammelt durch Abzeichen</div>
            </div>
        </div>
    );
}
