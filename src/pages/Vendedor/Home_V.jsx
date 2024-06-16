import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import MapStores from "../../components/MapStores";
import Countdown from "../../components/Countdown";
import "../../css/Vendedor/home.css"

import cuponik from "../../assets/cuponik/cuponik-onda.png";

export default function Home_V() {

    return (
        <>
            <Vendedor>
                <div className="container-cd">
                    <div className="row countdown-container-slideIn pinkCuponik">
                        <div className="col-xxl-8 col-xl-8 col-lg-6 col-md-6 col-12 div-cd-text contadorAmarillo">
                            <Countdown className="countdown-component"/>
                            <div className="countdown-text">¡Ya falta muy poco para el lanzamiento!</div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-12 div-cuponik-cd">
                            <img className="cuponik-cd-hv" src={cuponik} alt="Cuponik" />
                        </div>
                    </div>
                </div>
                <MapStores/>
            </Vendedor>
        </>
    );
}