import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BadgeHeader({ onBackClick }) {
    return (
        <>
            <div className="mb-4 flex items-center gap-2">
                <ArrowLeftIcon
                    onClick={onBackClick}
                    className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                />
            </div>
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Deine Abzeichen</h1>
        </>
    );
}
