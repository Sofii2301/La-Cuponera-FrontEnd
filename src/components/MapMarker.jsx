import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

// Corrigiendo la incompatibilidad con Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker = ({ setCoordinates }) => {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setCoordinates([lat, lng]);
        },
    });

    return position === null ? null : <Marker position={position}></Marker>;
};

const MapMarker = ({  onSave, handleClose }) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        // Solicitar la ubicación del usuario
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            },
            (error) => {
            console.error('Error obteniendo la ubicación:', error);
            }
        );
        } else {
        console.error('Geolocalización no está disponible en este navegador.');
        }
    }, []);

    if (latitude === null || longitude === null) {
        return <p>Cargando mapa...</p>;
    }

    const handleSave = () => {
        onSave(coordinates);
    };

    return (
        <>
            <MapContainer 
                center={[latitude, longitude]} 
                zoom={13} 
                style={{ height: '80vh', width: '100%' }}
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <LocationMarker setCoordinates={setCoordinates} />
            </MapContainer>
            <button className="btn btn-primary me-2" onClick={handleSave}>Guardar</button>
            <button className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
        </>
    );
};

export default MapMarker;
