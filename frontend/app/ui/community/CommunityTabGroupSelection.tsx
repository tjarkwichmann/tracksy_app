import { getUserGroups } from "@/lib/data/groups";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/outline";

/**
 *
 * @returns Komponente, die es Benutzern ermöglicht, ihre Gruppen auszuwählen und anzuzeigen.
 */
export default function CommunityTabGroupSelection() {
    const { data: session } = useSession();
    const [groups, setGroups] = useState([]);
    const router = useRouter();

    const userId = session?.user?.id;
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groups = await getUserGroups(userId);
                setGroups(groups);
            } catch (error) {
                console.error("Fehler beim Laden der Gruppen:", error);
            }
        };
        if (userId) {
            fetchGroups();
        }
    }, [userId]);

    return (
        <div className="space-y-4 shadow p-4">
            {groups.map((group) => (
                <Link href={`/community/group/${group.id}`} key={group.id}>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-white to-blue-50 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 mb-4">
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 relative">
                                    <UsersIcon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600">{group.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
