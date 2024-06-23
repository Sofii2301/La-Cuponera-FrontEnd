import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import MapStores from "../../components/MapStores";
import "../../css/Vendedor/home.css"
import Logo from "../../assets/logo.png"
import Winwin from "../../assets/winwin/WinWinGrande-izq.gif"
import Cuponik from "../../assets/cuponik/cuponik-onda.png"

export default function Home_V() {

    return (
        <>
                
            <Vendedor> 
                <h1 className=" tituloCont titulo">Bienvenidos a</h1>
                    <div className="container-cd homeContenedor w-100 d-flex align-items-center justify-content-center" >
                        <div className="winwinCont">
                            <img src={Winwin} alt="" />
                        </div>
                        <div>
                            <img className="logoTitulo" src={Logo} alt=""/>
                        </div>
                        <div className="cuponikCont">
                            <img src={Cuponik} alt="" />
                        </div>
                    </div>
                <MapStores/>
            </Vendedor>
        </>
    );
}