import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../assets/marker-icon.png';
import { getLogoImage, getVendedores } from '../services/vendedoresService';
import SwipeableEdgeDrawer from './SwipeableEdgeDrawer';
import logoDefault from "../assets/logo_default.png";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Raiting from './Raiting';
import ReactDOM from 'react-dom';
import { useAuth } from "../context/AuthContext";

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

function LocationMarker({ setUserPositionProp, setUserPositionState }) {
    const map = useMap();

    useEffect(() => {
        map.locate().on('locationfound', function (e) {
            setUserPositionProp(e.latlng); // Update the parent component's state
            setUserPositionState(e.latlng); // Update the local state in MapWithSidebar
            map.flyTo(e.latlng, map.getZoom());
            L.marker(e.latlng, { icon: userLocationIcon }).addTo(map).bindPopup("Tú").openPopup();
        });
    }, [map, setUserPositionProp, setUserPositionState]);

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

const fetchLogoImage = async (vendedorId) => {
    try {
        const logoImg = await getLogoImage(vendedorId);
        return logoImg;
    } catch (error) {
        console.error('Error fetching logo:', error);
        return logoDefault;
    }
};

const SelectedStoreMarker = ({ store, type }) => {
    const map = useMap();
    const navigate = useNavigate();
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        const fetchLogo = async () => {
            const logoImg = await fetchLogoImage(store.vendedor_id);
            setLogo(logoImg);
        };

        fetchLogo();
    }, [store.vendedor_id]);

    const gotoPerfilVendedor = () => {
        if (type === 'vendedor') {
            navigate(`/vendedor/perfil-vendedor/${store.vendedor_id}`);
        } else {
            navigate(`/cuponero/perfil-vendedor/${store.vendedor_id}`);
        }
    };

    useEffect(() => {
        map.flyTo([store.location.coordinates[0], store.location.coordinates[1]], 13);

        // Crea el popup usando JSX en lugar de strings de HTML
        const popupContent = (
            <div>
                <img
                    className="m-auto"
                    src={logo || logoDefault}
                    alt="Logo de la tienda"
                    style={{ maxWidth: '80px', height: 'auto' }}
                />
                <div>
                    <b>{store.nombreTienda}</b><br />
                    <div id="rating-container"></div>
                </div>
                <div className="text-primary popupLink" onClick={gotoPerfilVendedor}>
                    Ver tienda
                </div>
            </div>
        );

        // Renderiza el popup usando ReactDOM en lugar de manipulación directa del DOM
        const popupNode = document.createElement('div');
        ReactDOM.render(popupContent, popupNode);

        const popup = L.popup()
            .setLatLng([store.location.coordinates[0], store.location.coordinates[1]])
            .setContent(popupNode)
            .openOn(map);

        // Renderiza el componente Rating dentro del contenedor
        const ratingContainer = popupNode.querySelector('#rating-container');
        if (ratingContainer) {
            ReactDOM.render(<Rating vendedorId={store.vendedor_id} />, ratingContainer);
        }

        // Limpieza del popup al desmontar el componente
        return () => {
            map.closePopup(popup);
        };
    }, [map, store, logo]);



    return (
        <Marker 
            position={[store.location.coordinates[0], store.location.coordinates[1]]}
            eventHandlers={{
                click: gotoPerfilVendedor,
            }}
        >
            <Popup eventHandlers={{click: gotoPerfilVendedor}}>
                <div>
                    <img
                        src={logo || logoDefault}
                        alt="Logo de la tienda"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
                <div>
                    <b>{store.nombreTienda}</b><br />
                    Calificación: {store.rating}
                </div>
            </Popup>
        </Marker>
    );
};

// Componentes para el mapa y los controles personalizados
function CustomZoomControls() {
    const map = useMap();

    const zoomIn = () => {
        map.zoomIn();
    };

    const zoomOut = () => {
        map.zoomOut();
    };

    return (
        <div className="zoom-controls">
            <UserLocationButton />
            <button onClick={zoomIn} className="btn btn-azul">+</button>
            <button onClick={zoomOut} className="btn btn-azul">-</button>
        </div>
    );
}

const MapWithSidebar = ({ setUserPosition, type }) => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [userPosition, setUserPositionState] = useState(null);
    const [vendedores, setVendedores] = useState([]);
    const [logos, setLogos] = useState({});
    const mapRef = useRef();
    const navigate = useNavigate();

    const gotoPerfilVendedor = (vendedor_id) => {
        if (type === 'vendedor'){
            navigate(`/vendedor/perfil-vendedor/${vendedor_id}`);
        } else {
            navigate(`/cuponero/perfil-vendedor/${vendedor_id}`);
        }
    };

    useEffect(() => {
        const fetchAndSetVendedores = async () => {
            try {
                const data = await getVendedores('Complete');
                setVendedores(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    useEffect(() => {
        const fetchLogos = async () => {
            const logoPromises = vendedores.map(async (vendedor) => {
                const logo = await fetchLogoImage(vendedor.vendedor_id);
                return { vendedor_id: vendedor.vendedor_id, logo };
            });

            const logosArray = await Promise.all(logoPromises);
            const logosMap = logosArray.reduce((acc, { vendedor_id, logo }) => {
                acc[vendedor_id] = logo;
                return acc;
            }, {});

            setLogos(logosMap);
        };

        fetchLogos();
    }, [vendedores]);

    const sortedVendedores = userPosition
        ? [...vendedores].sort((a, b) => {
            const hasCoordinatesA = a.location?.coordinates && a.location.coordinates.length === 2;
            const hasCoordinatesB = b.location?.coordinates && b.location.coordinates.length === 2;

            if (hasCoordinatesA && hasCoordinatesB) {
                const distanceA = calculateDistance(userPosition.lat, userPosition.lng, a.location.coordinates[0], a.location.coordinates[1]);
                const distanceB = calculateDistance(userPosition.lat, userPosition.lng, b.location.coordinates[0], b.location.coordinates[1]);
                return distanceA - distanceB;
            } else if (hasCoordinatesA) {
                return -1;
            } else if (hasCoordinatesB) {
                return 1;
            } else {
                return 0;
            }
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

    const renderTooltip = (props, data) => (
        <Tooltip id="button-tooltip" className='tiendas-tooltip' {...props}>
            <img src={logos[data.vendedor_id] || logoDefault} alt="Logo del vendedor" className='m-auto' style={{ maxWidth: "100px" }} />
            <h4>{data.nombreTienda}</h4>
            <h5 className='tiendas-tooltip-desc'>{data.categorias && data.categorias.join(', ')}</h5>
            <p>Telefono: {data.telefono}</p>
            {data.paginaWeb && <p>Web: {data.paginaWeb}</p>}
        </Tooltip>
    );

    return (
        <div className="sidebar-map-container">
            {esPantallaGrande ? (
                <div className={`sidebar-map ${sidebarVisible ? 'visible' : 'hidden'}`}>
                    <h4>Tiendas</h4>
                    <ul className="list-group">
                        {sortedVendedores.map((vendedor) => (
                            <OverlayTrigger
                                key={vendedor.vendedor_id}
                                placement="right"
                                delay={{ show: 150, hide: 0 }}
                                overlay={(props) => renderTooltip(props, vendedor)}
                            >
                                <li className="list-group-item" onClick={() => handleStoreClick(vendedor)}>
                                    <strong>{vendedor.nombreTienda}</strong>
                                    <br />
                                    <p>Calificación: <Raiting vendedorId={vendedor.vendedor_id}/></p>
                                    {userPosition && vendedor.location?.coordinates && (
                                        <p>
                                            Distancia: {calculateDistance(userPosition.lat, userPosition.lng, vendedor.location.coordinates[0], vendedor.location.coordinates[1]).toFixed(2)} km
                                        </p>
                                    )}
                                </li>
                            </OverlayTrigger>
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
                    center={[4.8626103, -74.0574378]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                    whenCreated={map => { mapRef.current = map }}
                    zoomControl={false} // Desactivar controles de zoom predeterminados
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
                        vendedor.location?.coordinates && (
                            <Marker key={vendedor.id} position={[vendedor.location.coordinates[0], vendedor.location.coordinates[1]]}>
                                <Popup>
                                    <div className='d-flex align-items-center justify-content-center flex-column'>
                                        <img src={logos[vendedor.vendedor_id] || logoDefault} alt="Logo del vendedor" className='m-auto' style={{ maxWidth: "100px" }} />
                                        <br />
                                        <b>{vendedor.nombreTienda}</b>
                                        <br />
                                        <Raiting vendedorId={vendedor.vendedor_id}/>
                                        <br/>
                                        <div onClick={() => gotoPerfilVendedor(vendedor.vendedor_id)} className='text-primary popupLink'>Ver tienda</div>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    ))}
                    <LocationMarker setUserPositionProp={setUserPosition} setUserPositionState={setUserPositionState} />
                    {selectedStore?.location?.coordinates && (
                        <SelectedStoreMarker store={selectedStore} type={type}/>
                    )}
                    <CustomZoomControls />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapWithSidebar;
