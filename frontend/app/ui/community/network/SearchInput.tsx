import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchInputProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
};

/**
 *
 * @param param0 - Props für die SearchInput-Komponente
 * @param param0.searchQuery - Der aktuelle Suchbegriff
 * @param param0.setSearchQuery - Funktion zum Setzen des Suchbegriffs
 * @param param0.placeholder - Platzhaltertext für das Suchfeld (optional)
 * @returns Kompenete für das Suchfeld
 */
export default function SearchInput({ searchQuery, setSearchQuery, placeholder }: SearchInputProps) {
    return (
        <div className="rounded-xl bg-white p-3 sm:p-4 shadow mb-4">
            <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder={placeholder || "Suche..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                />
            </div>
        </div>
    );
}
