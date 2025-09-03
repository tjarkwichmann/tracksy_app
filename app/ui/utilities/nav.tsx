import NavLinks from "@/ui/utilities/NavLinks";

export default function Nav() {
    return (
        <>
            <div
                className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg
                            md:hidden">
                <div className="flex justify-center py-2">
                    <NavLinks />
                </div>
            </div>

            <div className="hidden md:flex md:flex-col md:w-46 md:min-h-screen md:bg-white md:border-r md:border-gray-200 md:shadow-sm">
                <div className="flex items-center px-6 py-6 border-b border-gray-100">
                    <span className="ml-3 text-lg font-semibold text-gray-900">Tracksy</span>
                </div>

                <nav className="flex-1 px-4 py-6">
                    <NavLinks />
                </nav>
            </div>
        </>
    );
}
