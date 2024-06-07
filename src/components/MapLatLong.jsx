import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// Corrigiendo la incompatibilidad con Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapLatLong = ({ coordinates }) => {
    if (!coordinates) {
        return <p>Coordenadas no disponibles</p>;
    }

    const [latitude, longitude] = coordinates;

    return (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '60vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={[latitude, longitude]} />
        </MapContainer>
    );
};

export default MapLatLong;
