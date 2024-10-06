import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet/dist/leaflet.css"

const RoutingMachine = ({ start, end }) => {
    const map = useMap()
    const [routingControl, setRoutingControl] = useState(null)

    useEffect(() => {
        if (!map || routingControl) return

        const newRoutingControl = L.Routing.control({
            waypoints: [
                L.latLng(start[0], start[1]),
                L.latLng(end[0], end[1]),
            ],
            lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 4 }],
            },
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
        });

        newRoutingControl.addTo(map);
        setRoutingControl(newRoutingControl)

        return () => {
            if (routingControl) {
                map.removeControl(routingControl)
            }
        };
    }, [map, start, end, routingControl])

    return null
};

const MapWithRoute = () => {
    const startCity = [48.8566, 2.3522]
    const endCity = [51.5074, -0.1278]

    return (
        <MapContainer center={[50.1109, 3.6298]} zoom={6} style={{ height: "67vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <RoutingMachine start={startCity} end={endCity} />
        </MapContainer>
    );
};

export default MapWithRoute
