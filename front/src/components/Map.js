import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet/dist/leaflet.css"

const RoutingMachine = ({ start, end }) => {
    const map = useMap()
    const [errorOccurred, setErrorOccurred] = useState(false)

    useEffect(() => {
        if (!map) return

        const routingControl = L.Routing.control({
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
        })

        try {
            routingControl.addTo(map)
            setErrorOccurred(false)
        } catch (error) {
            setErrorOccurred(true)
            console.error(error)
        }

        return () => {
            map.removeControl(routingControl)
        }
    }, [map, start, end])

    if (errorOccurred) {
        return null
    }

    return null
}

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
    )
}

export default MapWithRoute
