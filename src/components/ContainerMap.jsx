import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import Nav from "./Nav";
import Map from "./Map";
import RedesIcons from "./RedesIcons"
import winwin from "../assets/winwin/WinWinFINAL3_(1).gif";
import cuponikSm from "../assets/cuponik/cuponik-onda.png";
import winwinSgIn from "../assets/winwin/WinWinGrande-izq.gif";
import winwinSgInMb from "../assets/winwin/circulo-winwin.png";
import cuponikSgIn from "../assets/cuponik/CuponicSaludo3.gif";
import "../App.css"
import { useMediaQuery } from '@mui/material';

//<ContainerMap title="" subtitle="" isSignIn="sesion" ></ContainerMap>

function ContainerMap({ title, subtitle, isSignIn, children, imagen }) {
    const { type } = useParams();
    const location = useLocation();
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const [signinC, setSigninC] = useState(false);
    const [signupC, setSignupC] = useState(false);
    const [signinV, setSigninV] = useState(false);

    const [marginTop, setMarginTop] = useState(0);
    const [marginTopW, setMarginTopW] = useState(0);
    const [maxHeightW, setMaxHeightW] = useState(0);
    const [minHeight, setMinHeight] = useState(0);
    const [heightC, setHeightC] = useState(0);
    const [heightOv, setHeightOv] = useState(0);
    
    useEffect(() => {
        function adjustOverlayHeight() {
            const overlay = overlayRef.current;
            if (overlay) {
                overlay.style.minHeight = `${window.innerHeight}px`;
            }
        }

        adjustOverlayHeight(); // Ajustar la altura cuando se carga la página

        // Ajustar la altura cuando el contenido de la página cambia dinámicamente
        window.addEventListener('resize', adjustOverlayHeight);
        return () => {
            window.removeEventListener('resize', adjustOverlayHeight);
        };
    }, []);

    /* useEffect(() => {
        function adjustOverlayHeight() {
            const overlay = document.querySelector('.overlay');
            const navElement = document.querySelector('.border-bottom');
            const containerElement = document.querySelector('.container-map');
            if (navElement && containerElement && overlay) {
                const navHeight = navElement.clientHeight;
                const windowHeight = window.innerHeight;
                const containerHeight = containerElement.clientHeight;
                if (navHeight+containerHeight>windowHeight){
                    setHeightOv(navHeight+containerHeight);
                    console.log("grande: ",navHeight+containerHeight );
                } else {
                    setHeightOv(windowHeight);
                    console.log("grande: ", windowHeight);
                }
            }
        }

        adjustOverlayHeight(); // Ajustar la altura cuando se carga la página

        // Ajustar la altura cuando el contenido de la página cambia dinámicamente
        window.addEventListener('resize', adjustOverlayHeight);
        return () => {
            window.removeEventListener('resize', adjustOverlayHeight);
            console.log("event");
        };
    }, []);*/

    useEffect(() => {
        function calculateMarginTop() {
            const navElement = document.querySelector('.border-bottom');
            const containerElement = document.querySelector('.formulario-cmap');
            const imgElement = document.querySelector('#winwin');
            if (navElement && containerElement) {
                const navHeight = navElement.clientHeight;
                const windowHeight = window.innerHeight;
                const windowWidth = window.innerWidth;
                const containerHeight = containerElement.clientHeight;
                const calculatedMarginTop = (windowHeight - containerHeight - navHeight) / 2;
                const maxWidth = 750;
                
                /*console.log(!(windowWidth>maxWidth));
                console.log(windowWidth>maxWidth);
                console.log(windowHeight>navHeight+containerHeight);
                console.log('Nav Height:', navHeight);
                console.log('Window Height:', windowHeight);
                
                console.log('Window Width:', windowWidth);
                console.log('Container Height:', containerHeight);
                console.log('Calculated Margin Top:', calculatedMarginTop);*/
                
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

                setHeightC(0);
                if (location.pathname === "/thank-you/vendedor" && windowWidth<600) {
                    if (calculatedMarginTop>150){
                        setHeightC(calculatedMarginTop);
                    } else {
                        setHeightC(150);
                    }
                    setMarginTop(0);
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
    
    useEffect(() => {
        if (location.pathname === "/") {
            setSigninC(true);
        }
        if (location.pathname === "/signin/vendedor") {
            setSigninV(true);
        }
        if (location.pathname === "/signup/cuponero") {
            setSignupC(true);
        }
    }, []);

    const esPantallaGrande = useMediaQuery('(min-width: 768px)');

    return (
        <>
            <Map type="map-fondo"/>
            <div className="overlay"  /*style={{height:`${heightOv}px`}} */ ref={overlayRef}>
                <div className="container-map">
                    <Nav isSignIn={isSignIn}/>
                    <div className={`${(signinC || signinV) ? (esPantallaGrande ? 'flex-row' : 'flex-column-reverse') : ('')} ${(signupC) && !esPantallaGrande && 'flex-column'} container container-cmap row`} style={{ marginTop: `${marginTop}px`, maxWidth: "100%", justifyContent:`${signinC && 'space-around'}`}} ref={containerRef}>
                        {signinC && (
                            <>
                            <div className="col-ww-sg col-md-5 col-sm-6 d-flex align-items-center col-signin" style={{ }}>
                                {esPantallaGrande ? 
                                    (
                                        <img src={winwinSgIn} alt="WinWin" className="img-fluid" style={{ objectFit: `cover`, marginTop: `-${marginTop}px`}}/>
                                    ):(
                                        <img src={winwinSgInMb} alt="WinWin" className="img-fluid" style={{ objectFit: `cover`}}/>
                                    )
                                }
                                <div className="redes-sgin">
                                    <p>Seguinos en nuestras redes sociales:</p>
                                    <RedesIcons/>
                                </div>
                            </div>
                            </>
                        )}
                        {signinV && (
                            <>
                            <div className="col-ck-sg col-md-4 col-sm-6 col-xs-6 d-flex" style={{ }}>
                                <img src={cuponikSgIn} alt="WinWin" className="img-fluid" style={{ objectFit: `cover`}}/>
                                <div className="redes-sgin">
                                    <p>Seguinos en nuestras redes sociales:</p>
                                    <RedesIcons/>
                                </div>
                            </div>
                            </>
                        )}
                        {imagen === "r-cuponero" && (
                            <>
                            { <img id="winwin" src={winwin} alt="WinWin" className="img-fluid" style={{ marginTop: `${marginTopW}px`}}/> }
                            </>
                        )}

                        {imagen === "cuponik-lanz-sm" && (
                            <>
                            {type === "vendedor" ? (
                                <img className="cuponik-lanz-sm" src={cuponikSm} style={{height:`${heightC}px`}} />
                            ) : ("")}
                            </>
                        )}
                        <div className="formulario-cmap mb-3 col-md-6 col-sm-8 col-xs-8"  style={{ maxWidth: "100%" }}>
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
