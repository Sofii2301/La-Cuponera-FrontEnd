import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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
    { id: 4, name: 'Tienda 4', rating: 2.5, lat: 51.520, lng: -0.17 },
    { id: 5, name: 'Tienda 5', rating: 3.9, lat: 52.525, lng: -0.21 },
    { id: 6, name: 'Tienda 6', rating: 4.5, lat: 51.500, lng: -0.5 },
    { id: 7, name: 'Tienda 7', rating: 5.0, lat: 51.530, lng: -0.15 },
    { id: 8, name: 'Tienda 8', rating: 2.5, lat: 51.510, lng: -0.12 },
    { id: 9, name: 'Tienda 9', rating: 1.5, lat: 51.580, lng: -0.25 },
];

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}


const MapWithSidebar = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const sidebarRef = useRef(null);

    const handleStoreClick = (store) => {
        setSelectedStore(store);
        mapRef.current.setView([store.position.lat, store.position.lng], 13);
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
                <LocationMarker />
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
                {/* Agrega los controles de zoom personalizados */}
                <div className="zoom-controls">
                    <button onClick={() => sidebarRef.current.leafletElement.zoomIn()} className="btn btn-azul">+</button>
                    <button onClick={() => sidebarRef.current.leafletElement.zoomOut()} className="btn btn-azul">-</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default MapWithSidebar;
