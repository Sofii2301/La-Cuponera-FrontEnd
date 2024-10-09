import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import MapStores from "../../components/MapStores";
import "../../css/Vendedor/home.css"
import Logo from "../../assets/logo.png"
import Winwin from "../../assets/winwin/WinWinGrande-izq.gif"
import Cuponik from "../../assets/cuponik/cuponik-onda.png"

export default function Home_V() {
    const [userPosition, setUserPosition] = useState(null);

    return (
        <>
                
            <Vendedor> 
                <div className="container-cd">
                    <div className="row countdown-container-slideIn">
                        <div className="col-xxl-7 col-xl-7 col-lg-6 col-md-6 col-12 div-cd-text d-flex flex-column align-items-center">
                            <h1 className="titulo tituloCont pb-2">Bienvenido de nuevo a</h1>
                            <img className="logoTitulo img-fluid" src={Logo} alt=""/>
                        </div>
                        <div className="col-xxl-5 col-xl-5 col-lg-6 col-md-6 col-12 div-cuponik-cd">
                            <img className="cuponik-cd-hv" src={Cuponik} alt="" />
                        </div>
                    </div>
                    </div>
                <MapStores setUserPosition={setUserPosition} type='vendedor'/>
            </Vendedor>
        </>
    );
}