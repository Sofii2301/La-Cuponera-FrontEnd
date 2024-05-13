import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Vendedor/ListaCupones";

import portada from "../../assets/banner_default.png";
import logo from "../../assets/logo_default.png";
import Map from "../../components/Map";

export default function Perfil_vistaPrevia() {
    const vendedor = JSON.parse(localStorage.getItem("vendedorData"));
    const cupones = JSON.parse(localStorage.getItem("cupones")) || [];
    return (
        <>
        <Vendedor>
            <div className="container mt-5">
                <div className="row">
                    {/* Foto de portada */}
                    <div className="col-12">
                    {vendedor && vendedor.portada ? (
                        <img src={vendedor.portada} alt="Portada" className="img-fluid" />
                    ) : (
                        <img src={portada} alt="Portada" className="img-fluid" />
                    )}
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-3">
                        {/* Foto de perfil/logo */}
                        {vendedor && vendedor.portada ? (
                            <img src={vendedor.logo} alt="Logo" className="img-fluid rounded-circle" />
                        ) : (
                            <img src={logo} alt="Portada" className="img-fluid" />
                        )}
                        
                    </div>
                    <div className="col-md-9">
                        {/* Nombre del vendedor */}
                        {vendedor && vendedor.storeName ? (
                            <h2>{vendedor.storeName}</h2>
                        ) : (
                            <h2>Nombre de la Tienda</h2>
                        )}
                        {/* Dirección */}
                        {vendedor && vendedor.storeAddress ? (
                            <p><strong>Dirección:</strong> {vendedor.storeAddress}</p>
                        ) : (
                            <p><strong>Dirección:</strong> Calle 123</p>
                        )}
                        {/* Descripción */}
                        {vendedor && vendedor.storeDescription ? (
                            <p><strong>Descripción:</strong> {vendedor.storeDescription}</p>
                        ) : (
                            <p><strong>Descripción:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. At culpa atque repellat, qui impedit accusamus perspiciatis sint necessitatibus tempora, incidunt modi magnam consectetur similique id nihil ex laboriosam earum fuga!</p>
                        )}
                        {/* Horarios */}
                        {vendedor && vendedor.storeHours ? (
                            <p><strong>Horarios:</strong> {vendedor.storeHours}</p>
                        ) : (
                            <p><strong>Horarios:</strong> 08:00 a 20:00</p>
                        )}
                    </div>
                </div>
                <div className="row mt-4">
                    {/* Mapa de localización */}
                    <h3>Ubicación</h3>    
                    <Map type="map-cuadro"/>
                </div>
                <div className="row mt-4">
                    {/* Cupones */}
                    <h3>Cupones</h3>
                    <ListaCupones  cupones={cupones}/>
                </div>
            </div>
        </Vendedor>
        </>
    );
}