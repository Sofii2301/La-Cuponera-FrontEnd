import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMediaQuery } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../assets/marker-icon.png';
import { getVendedores } from '../services/vendedoresService';
import SwipeableEdgeDrawer from './SwipeableEdgeDrawer';

// Icono personalizado para Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
});

// Icono personalizado para la ubicación del usuario
const userLocationIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

function LocationMarker({ setUserPosition }) {
    const map = useMap();

    useEffect(() => {
        map.locate().on('locationfound', function (e) {
            setUserPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            L.marker(e.latlng, { icon: userLocationIcon }).addTo(map).bindPopup("Tú").openPopup();
        });
    }, [map, setUserPosition]);

    return null;
}

function UserLocationButton() {
    const map = useMap();

    const handleUserLocationClick = () => {
        map.locate().on('locationfound', function (e) {
            map.flyTo(e.latlng, map.getZoom());
            L.marker(e.latlng, { icon: userLocationIcon }).addTo(map).bindPopup("Tú").openPopup();
        });
    };

    return (
        <button onClick={handleUserLocationClick} className="btn btn-rosa">
            <i className="bi bi-crosshair2"></i>
        </button>
    );
}

const SelectedStoreMarker = ({ store }) => {
    const map = useMap();

    useEffect(() => {
        map.flyTo([store.location.coordinates[0], store.location.coordinates[1]], map.getZoom());
        const popup = L.popup()
            .setLatLng([store.location.coordinates[0], store.location.coordinates[1]])
            .setContent(`<b>${store.nombreTienda}</b><br>Calificación: ${store.rating}`)
            .openOn(map);
        
        return () => {
            map.closePopup(popup);
        };
    }, [map, store]);

    return (
        <Marker position={[store.location.coordinates[0], store.location.coordinates[1]]}>
            <Popup>
                {store.nombreTienda}<br />Calificación: {store.rating}
            </Popup>
        </Marker>
    );
};

const MapWithSidebar = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [userPosition, setUserPosition] = useState(null);
    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        /*const vendedor = {
            nombreTienda: 'Tienda prueba',
            raiting: 5.0,
            location: {
                type: "Point",
                coordinates: [-35.400, -68.500],
            }
        };
        const lista_vendedores = [vendedor];
        setVendedores(lista_vendedores);
        console.log('vendedores: ', vendedores);*/

        const fetchAndSetVendedores = async () => {
            try {
                const data = await getVendedores();
                console.log('Vendedores data:', data);
                setVendedores(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    const sortedVendedores = userPosition
        ? [...vendedores].sort((a, b) => {
            const distanceA = calculateDistance(userPosition.lat, userPosition.lng, a.location?.coordinates?.[0], a.location?.coordinates?.[1]);
            const distanceB = calculateDistance(userPosition.lat, userPosition.lng, b.location?.coordinates?.[0], b.location?.coordinates?.[1]);
            return distanceA - distanceB;
        })
        : vendedores;

    const handleStoreClick = (store) => {
        setSelectedStore(store);
    };

    const handleMouseEnterMap = () => {
        setSidebarVisible(false);
    };
    
    const handleMouseLeaveMap = () => {
        setSidebarVisible(true);
    };

    const esPantallaGrande = useMediaQuery('(min-width: 767px)');

    return (
        <div className="sidebar-map-container">
            {esPantallaGrande ? (
                <div className={`sidebar-map ${sidebarVisible ? 'visible' : 'hidden'}`}>
                    <h4 >Tiendas</h4>
                    <ul className="list-group">
                        {sortedVendedores.map((vendedor) => (
                            <li key={vendedor._id} className="list-group-item" onClick={() => handleStoreClick(vendedor)}>
                                <strong>{vendedor.nombreTienda}</strong>
                                <br />
                                <p>Calificación: {vendedor.rating}</p>
                                {userPosition && vendedor.location && vendedor.location.coordinates && (
                                    <p>
                                        Distancia: {calculateDistance(userPosition.lat, userPosition.lng, vendedor.location.coordinates[0], vendedor.location.coordinates[1]).toFixed(2)} km
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="sidebar_bottom_mp">
                    <SwipeableEdgeDrawer vendedores={sortedVendedores} onStoreClick={handleStoreClick} />
                </div>
            )}
            <div className="map-wrapper" onMouseEnter={handleMouseEnterMap} onMouseLeave={handleMouseLeaveMap}>
                <MapContainer 
                    center={[51.505, -0.09]} 
                    zoom={13} 
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userPosition && (
                        <Marker position={userPosition} icon={userLocationIcon}>
                            <Popup>Tu ubicación</Popup>
                        </Marker>
                    )}
                    {sortedVendedores.map((vendedor) => (
                        vendedor.location && vendedor.location.coordinates && (
                            <Marker key={vendedor._id} position={[vendedor.location.coordinates[0], vendedor.location.coordinates[1]]}>
                                <Popup>{vendedor.nombreTienda}<br />Calificación: {vendedor.rating}</Popup>
                            </Marker>
                        )
                    ))}
                    <LocationMarker setUserPosition={setUserPosition} />
                    {selectedStore && selectedStore.location && selectedStore.location.coordinates && (
                        <SelectedStoreMarker store={selectedStore} />
                    )}
                    <div className="zoom-controls">
                        <UserLocationButton />
                        <button onClick={() => mapRef.current.zoomIn()} className="btn btn-azul">+</button>
                        <button onClick={() => mapRef.current.zoomOut()} className="btn btn-azul">-</button>
                    </div>
                </MapContainer>
            </div>
        </div>
    );
};

export default MapWithSidebar;
