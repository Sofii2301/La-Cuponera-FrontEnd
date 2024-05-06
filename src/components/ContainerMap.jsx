import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Map from "./Map";
import winwin from "../assets/winwin/WinWinFINAL3_(1).gif";
import "../App.css"

//<ContainerMap title="" subtitle="" isSignIn="sesion" ></ContainerMap>

function ContainerMap({ title, subtitle, isSignIn, children, imagen }) {
    const location = useLocation();
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const [marginTop, setMarginTop] = useState(0);
    const [marginTopW, setMarginTopW] = useState(0);
    const [maxHeightW, setMaxHeightW] = useState(0);
    const [minHeight, setMinHeight] = useState(0);
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
            const navElement = document.querySelector('.container-navbar');
            const containerElement = document.querySelector('.formulario-cmap');
            const imgElement = document.querySelector('#winwin');
            if (navElement && containerElement) {
                const navHeight = navElement.clientHeight;
                const windowHeight = window.innerHeight;
                const windowWidth = window.innerWidth;
                const containerHeight = containerElement.clientHeight;
                const calculatedMarginTop = (windowHeight - containerHeight - navHeight) / 2;
                const maxWidth = 750;
                
                console.log(!(windowWidth>maxWidth));
                console.log(windowWidth>maxWidth);
                console.log(windowHeight>navHeight+containerHeight);
                console.log('Nav Height:', navHeight);
                console.log('Window Height:', windowHeight);
                
                console.log('Window Width:', windowWidth);
                console.log('Container Height:', containerHeight);
                console.log('Calculated Margin Top:', calculatedMarginTop);
                
                if (windowHeight>navHeight+containerHeight){
                    setMarginTop(calculatedMarginTop);
                } else {
                    setMarginTop(50);
                }
                setMarginTopW(navHeight);
                if (imgElement){
                    const imgHeight = imgElement.clientHeight;
                    console.log('Img Height:', imgHeight);
                    setMinHeight(imgHeight);
                }
                setMaxHeightW(containerHeight);

                if (location.pathname === "/signup/cuponero") {
                    if (!(windowWidth>maxWidth)){
                        setMarginTopW(0);
                        setMarginTop(0);
                    }
                }
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
                    <Nav isSignIn={isSignIn}/>
                    <div className="container container-cmap d-flex justify-content-center align-items-center"  style={{ marginTop: `${marginTop}px` }} ref={containerRef}>
                        {imagen === "r-cuponero" && (
                            <>
                            { <img id="winwin" src={winwin} alt="WinWin" className="img-fluid" style={{ marginTop: `${marginTopW}px`, maxHeight:`${maxHeightW}px`}}/> }
                            </>
                        )}
                        <div className="formulario-cmap"  style={{ minHeight: `${minHeight}px` }}>
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
