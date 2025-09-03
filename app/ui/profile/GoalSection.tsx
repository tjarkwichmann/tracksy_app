import Link from "next/link";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function GoalSection() {
    return (
        <Link href="/profile/goals" className="block">
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointe">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-gradient-to-r from-blue-50 to-blue-100 p-3">
                            <CheckCircleIcon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Ziele verwalten</h2>
                            <p className="text-sm text-gray-500">Setze und verfolge deine wöchentlichen Fitnessziele</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center  justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-blue-400">Ziele bearbeiten</span>
                    <ArrowRightIcon className="h-4 w-4 text-blue-400" />
                </div>
            </div>
        </Link>
    );
}
