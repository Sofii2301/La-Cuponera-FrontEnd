import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import MapStores from "../../components/MapStores";
import Countdown from "../../components/Countdown";

import cuponik from "../../assets/cuponik/cuponik-onda.png";

export default function Home_V() {

    return (
        <>
            <Vendedor>
                <div className="container-cd">
                    <div className="row countdown-container-slideIn">
                        <div className="col-xl-8 col-6 div-cd-text">
                            <Countdown className="countdown-component"/>
                            <div className="countdown-text">¡Ya falta muy poco para el lanzamiento!</div>
                        </div>
                        <div className="col-4 div-cuponik-cd">
                            <img className="cuponik-cd-hv" src={cuponik} alt="Cuponik" />
                        </div>
                    </div>
                </div>
                <MapStores/>
            </Vendedor>
        </>
    );
}