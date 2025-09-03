import { formatTimeWithHourAndMinute } from "@/lib/utils";
import { RocketLaunchIcon, MapPinIcon } from "@heroicons/react/24/outline";

type PreviewHeaderProps = {
    startTime: string;
    endTime: string;
    type: string;
};

export default function PreviewHeader({ startTime, endTime, type }: PreviewHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4  rounded-full">
                    {type === "workout" ? <RocketLaunchIcon /> : <MapPinIcon />}
                </div>
                <h3 className="font-semibold text-gray-900">
                    {new Date(startTime).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </h3>
            </div>
            <span className="text-sm text-gray-500">
                {formatTimeWithHourAndMinute(startTime)} - {formatTimeWithHourAndMinute(endTime)}
            </span>
        </div>
    );
}
