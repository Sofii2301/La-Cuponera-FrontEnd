import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icono personalizado para Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
});

const stores = [
  { id: 1, name: 'Tienda 1', rating: 4.5, lat: 51.505, lng: -0.09 },
  { id: 2, name: 'Tienda 2', rating: 4.0, lat: 51.515, lng: -0.1 },
  { id: 3, name: 'Tienda 3', rating: 3.5, lat: 51.525, lng: -0.11 },
];

const MapWithSidebar = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const sidebarRef = useRef(null);

    const handleStoreClick = (store) => {
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
                {stores.map(store => (
                    <li key={store.id} className="list-group-item" onClick={() => handleStoreClick(store)}>
                    <strong>{store.name}</strong>
                    <br />
                    Calificación: {store.rating}
                    </li>
                ))}
                </ul>
            </div>
            <div className="map-wrapper" onMouseEnter={handleMouseEnterMap} onMouseLeave={handleMouseLeaveMap}>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {stores.map(store => (
                    <Marker key={store.id} position={[store.lat, store.lng]}>
                    <Popup>
                        {store.name}<br />Calificación: {store.rating}
                    </Popup>
                    </Marker>
                ))}
                {selectedStore && (
                    <Marker position={[selectedStore.lat, selectedStore.lng]}>
                    <Popup>
                        {selectedStore.name}<br />Calificación: {selectedStore.rating}
                    </Popup>
                    </Marker>
                )}
                </MapContainer>
            </div>
        </div>
        </>
    );
};

export default MapWithSidebar;
