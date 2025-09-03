import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ResultPopUpProps {
    message?: string;
    title?: string;
    onClose?: () => void;
    success?: boolean;
}

export default function ResultPopUp({
    message = "Deine Aktion war erfolgreich!",
    title = "Erfolg",
    onClose,
    success = true,
}: ResultPopUpProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                    onClick={onClose ?? (() => window.location.reload())}
                    aria-label="Schließen">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                {success ? (
                    <CheckCircleIcon className="w-14 h-14 text-green-500 mb-3" />
                ) : (
                    <XMarkIcon className="w-14 h-14 text-red-500 mb-3" />
                )}
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
                <p className="text-gray-700 text-center mb-4">{message}</p>
                <button
                    className={`mt-2 px-5 py-2 rounded-lg font-semibold shadow transition-colors ${
                        success
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    onClick={onClose ?? (() => window.location.reload())}>
                    Schließen
                </button>
            </div>
        </div>
    );
}
