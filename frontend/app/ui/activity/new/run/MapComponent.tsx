"use client";
import { RoutePoint } from "@/lib/definitions";
import { RecenterAutomatically } from "./RecenterAutomatically";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
    position?: [number, number];
    route: RoutePoint[];
}

/**
 *
 * @param route - Array of coordinates representing the route
 * @param isRunning - Boolean indicating if the user is currently tracking the run or not
 * @param position - Current position of the user, used to recenter the map
 * @returns The MapComponent with the route for the run
 */
export default function MapComponent({ route, position }: MapComponentProps) {
    const defaultPosition: [number, number] = [51.505, -0.09]; // Default position if no route is provided
    const center: [number, number] = position ?? defaultPosition;

    return (
        <MapContainer center={center} zoom={16} className="h-72 w-full mb-4">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {route && route.length > 0 && (
                <Polyline
                    positions={route.map((point) => [point.latitude, point.longitude] as [number, number])}
                    color="blue"
                />
            )}
            {position && <RecenterAutomatically lat={position[0]} long={position[1]} />}
        </MapContainer>
    );
}
