export default function LoginLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">{children}</div>
        </div>
    );
}
