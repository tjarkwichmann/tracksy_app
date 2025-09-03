interface PostComponentHeaderProps {
    userName: string;
    date: string;
}

export default function PostComponentHeader({ userName, date }: PostComponentHeaderProps) {
    return (
        <div className="p-4 pb-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10  bg-gradient-to-r from-blue-500 to-purple-600  rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 text-sm">{`${userName}`}</h3>
                        </div>
                        <div className="text-xs text-gray-500">{date}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
