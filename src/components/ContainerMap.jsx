import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import Map from "./Map";

import "../App.css"

//<ContainerMap title="" subtitle="" isSignIn="sesion" ></ContainerMap>

function ContainerMap({ title, subtitle, isSignIn, children }) {
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const [marginTop, setMarginTop] = useState(0);

    useEffect(() => {
        function adjustOverlayHeight() {
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + 'px';
            }
        }

        adjustOverlayHeight(); // Ajustar la altura cuando se carga la página

        // Ajustar la altura cuando el contenido de la página cambia dinámicamente
        window.addEventListener('resize', adjustOverlayHeight);
        return () => {
            window.removeEventListener('resize', adjustOverlayHeight);
        };
    }, []);

    useEffect(() => {
        function calculateMarginTop() {
            const navElement = document.querySelector('.nav-map');
            const containerElement = document.querySelector('.formulario-cmap');
            if (navElement) {
                const navHeight = navElement.offsetHeight;
                const windowHeight = window.innerHeight;
                const containerHeight = containerElement.offsetHeight;
                const calculatedMarginTop = (windowHeight - containerHeight - navHeight) / 2;
                setMarginTop(calculatedMarginTop);
            }
        }
    
        calculateMarginTop(); // Calcular el margen superior cuando se carga la página
    
        // Recalcular el margen superior cuando el contenido de la página cambia dinámicamente
        window.addEventListener('resize', calculateMarginTop);
        return () => {
            window.removeEventListener('resize', calculateMarginTop);
        };
    }, []);
    

    return (
        <>
            <Map />
            <div className="overlay" ref={overlayRef}>
                <div className="container-map">
                    <Nav isSignIn={isSignIn} className="nav-map"/>
                    <div className="container container-cmap d-flex justify-content-center align-items-center"  style={{ marginTop: `${marginTop}px` }} ref={containerRef}>
                        <div className="formulario-cmap">
                            <div className="mb-lg-9 mb-5 text-center">
                                <h1 className="mb-1 h2 fw-bold titulo">{title}</h1>
                                <p id="subtitulo">{subtitle}</p>
                            </div>
                            <div className="content">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerMap;
