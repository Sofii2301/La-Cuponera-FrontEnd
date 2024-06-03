import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrigiendo la incompatibilidad con Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapLatLong = () => {
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        // Simulación de obtener coordenadas desde la API
        /*fetch('https://api.example.com/get-coordinates')
        .then(response => response.json())
        .then(data => {
            setCoordinates([data.lat, data.lng]);
        })
        .catch(error => console.error('Error al obtener las coordenadas:', error));*/
        setCoordinates([4.864417798159587, -74.06005932630879]); //Chia Colombia
    }, []);

    return (
        <MapContainer 
            center={coordinates || [4.864417798159587, -74.06005932630879]} 
            zoom={13} 
            style={{ height: '80vh', width: '100%' }}
            scrollWheelZoom={false}  // Desactivar el zoom con la rueda del mouse
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {coordinates && (
                <Marker position={coordinates}></Marker>
            )}
        </MapContainer>
    );
};

export default MapLatLong;
