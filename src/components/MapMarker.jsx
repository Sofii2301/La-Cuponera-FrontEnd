import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

const MapMarker = ({ setCoordinates }) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

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

    return (
        <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
        scrollWheelZoom={false} 
        >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker setCoordinates={setCoordinates} />
        </MapContainer>
    );
};

const App = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [message, setMessage] = useState('');

    const sendCoordinatesToAPI = async (coordinates) => {
        setMessage('Coordenadas guardadas exitosamente!');
        /*try {
            const response = await fetch('https://tu-api-endpoint.com/api/coordinates', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lat: coordinates[0], lng: coordinates[1] }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Coordenadas enviadas exitosamente!');
            } else {
                setMessage('Error al enviar coordenadas.');
            }
        } catch (error) {
            console.error('Error al enviar coordenadas:', error);
            setMessage('Error al enviar coordenadas.');
        }*/
    };

    return (
        <div>
        {/* <h1>Mapa para seleccionar ubicación</h1> */}
        <MapMarker setCoordinates={setCoordinates} />
        {coordinates && (
            <div>
            <h2>Coordenadas seleccionadas:</h2>
            <p>Latitud: {coordinates[0]}</p>
            <p>Longitud: {coordinates[1]}</p>
            <button onClick={() => sendCoordinatesToAPI(coordinates)} className='btn btn-rosa'>Enviar Coordenadas</button>
            {message && <p>{message}</p>}
            </div>
        )}
        </div>
    );
};

export default App;
