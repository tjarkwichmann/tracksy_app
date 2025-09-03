import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface RecenterAutomaticallyProps {
    lat: number;
    long: number;
}
/**
 *
 * @param lat - Latitude of the user
 * @param long - Longitude of the user
 * @returns A helper component that recenters the map view
 */
export const RecenterAutomatically = ({ lat, long }: RecenterAutomaticallyProps) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, long]);
    }, [lat, long]);
    return null;
};
