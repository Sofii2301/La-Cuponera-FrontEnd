import React, { useRef, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({type}) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);
        }

        // Solicitar la ubicación del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    mapRef.current.setView([latitude, longitude], 13);
                    L.marker([latitude, longitude]).addTo(mapRef.current);
                },
                (error) => {
                    console.error("Error obteniendo la ubicación:", error);
                }
            );
        } else {
            console.error("Geolocalización no está disponible en este navegador.");
        }
    })

    return(
        <>
        <div className={type} id="map">
            {/* <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12451.686771735223!2d-62.27439210000001!3d-38.7196068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbcabdc1302bd%3A0x9c3ae256e9e7effe!2sYPF!5e0!3m2!1ses!2sar!4v1713828389644!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
        </div>
        </>
    )
}