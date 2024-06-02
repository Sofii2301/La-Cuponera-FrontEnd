import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import cuponik from '../assets/cuponik/ubi_cuponik.png';
import icon from '../assets/marker-icon.png';
import { getVendedores } from '../services/vendedoresService';

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

    /*useEffect(() => {
        map.locate().on('locationfound', function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 13);
            L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
        });
    }, [map]);

    console.log(position);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );*/
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
        map.flyTo([store.lat, store.lng], map.getZoom());
        const popup = L.popup()
            .setLatLng([store.lat, store.lng])
            .setContent(`<b>${store.name}</b><br>Calificación: ${store.rating}`)
            .openOn(map);
        
        return () => {
            map.closePopup(popup);
        };
    }, [map, store]);

    return (
        <Marker position={[store.lat, store.lng]}>
            <Popup>
                {store.name}<br />Calificación: {store.rating}
            </Popup>
        </Marker>
    );
};

const MapWithSidebar = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [userPosition, setUserPosition] = useState(null);
    const [vendedores, setVendedores] = useState([]);
    const sidebarRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchAndSetVendedores = async () => {
            try {
                const stores = [
                    { id: 1, name: 'Tienda 1', rating: 4.5, lat: -38.672, lng: -62.272 },
                    { id: 2, name: 'Tienda 2', rating: 4.0, lat: 51.515, lng: -0.1 },
                    { id: 3, name: 'Tienda 3', rating: 3.5, lat: 51.525, lng: -0.11 },
                    { id: 4, name: 'Tienda 4', rating: 2.5, lat: 51.520, lng: -0.17 },
                    { id: 5, name: 'Tienda 5', rating: 3.9, lat: 52.525, lng: -0.21 },
                    { id: 6, name: 'Tienda 6', rating: 4.5, lat: 51.500, lng: -0.5 },
                    { id: 7, name: 'Tienda 7', rating: 5.0, lat: 51.530, lng: -0.15 },
                    { id: 8, name: 'Tienda 8', rating: 2.5, lat: 51.510, lng: -0.12 },
                    { id: 9, name: 'Tienda 9', rating: 1.5, lat: 51.580, lng: -0.25 },
                ];
                setVendedores(stores);
                //const data = await getVendedores();
                //setVendedores(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    const sortedVendedores = userPosition
        ? [...vendedores].sort((a, b) => {
            const distanceA = calculateDistance(userPosition.lat, userPosition.lng, a.lat, a.lng);
            const distanceB = calculateDistance(userPosition.lat, userPosition.lng, b.lat, b.lng);
            return distanceA - distanceB;
        })
        : vendedores;

    const handleStoreClick = (store) => {
        /*if (mapRef.current) {
            setSelectedStore(store);
            mapRef.current.setView([store.position.lat, store.position.lng], 13);
            L.popup()
                .setLatLng([store.lat, store.lng])
                .setContent(`<b>${store.name}</b><br>Calificación: ${store.rating}`)
                .openOn(mapRef.current);
        }*/
        setSelectedStore(store);
    };

    const handleMouseEnterMap = () => {
        setSidebarVisible(false);
    };
    
    const handleMouseLeaveMap = () => {
        setSidebarVisible(true);
    };

    return (
        <>
        <div className="sidebar-map-container">
            <div className={`sidebar-map ${sidebarVisible ? 'visible' : 'hidden'}`} ref={sidebarRef}>
                <h4>Tiendas</h4>
                <ul className="list-group">
                    {sortedVendedores.map((vendedor) => (
                        <li key={vendedor.id} className="list-group-item" onClick={() => handleStoreClick(store)}>
                            <strong>{vendedor.name}</strong>
                            <br />
                            <p>Calificación: {vendedor.rating}</p>
                            {userPosition && (
                                <p>
                                    Distancia: {calculateDistance(userPosition.lat, userPosition.lng, vendedor.lat, vendedor.lng).toFixed(2)} km
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="map-wrapper" onMouseEnter={handleMouseEnterMap} onMouseLeave={handleMouseLeaveMap}>
                <MapContainer 
                    center={[51.505, -0.09]} 
                    zoom={13} 
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={false}
                    whenCreated={(map) => (mapRef.current = map)}
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
                        <Marker key={vendedor.id} position={[vendedor.lat, vendedor.lng]}>
                            <Popup>{vendedor.name}</Popup>
                        </Marker>
                    ))}
                    <LocationMarker setUserPosition={setUserPosition} />
                    {selectedStore && (
                        <SelectedStoreMarker store={selectedStore} />
                    )}
                    {/* Agrega los controles de zoom personalizados */}
                    <div className="zoom-controls">
                        <UserLocationButton setUserPosition={setUserPosition} />
                        <button onClick={() => sidebarRef.current.leafletElement.zoomIn()} className="btn btn-azul">+</button>
                        <button onClick={() => sidebarRef.current.leafletElement.zoomOut()} className="btn btn-azul">-</button>
                    </div>
                </MapContainer>
            </div>
        </div>
        </>
    );
};

export default MapWithSidebar;
