import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Vendedor/ListaCupones";
import Perfil from "./Perfil"
import portada from "../../assets/banner_default.png";
import logo from "../../assets/logo_default.png";
import Map from "../../components/Map";

export default function Perfil_vistaPrevia() {
    const vendedor = JSON.parse(localStorage.getItem("vendedorData"));
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        // Obtener los cupones del vendedor desde localStorage
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData && vendedorData.cupones) {
            setCupones(vendedorData.cupones);
        }
    }, []);

    return (
        <>
        <Perfil>
            <div class="row row-sm"> </div>
                
            
            <div className="row mt-4"  id="about">
                <div className="col-md-9">
                    
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
            <div className="row mt-4" id="edit">
                {/* Mapa de localización */}
                <h3>Ubicación</h3>    
                <Map type="map-cuadro"/>
            </div>
            <div className="row mt-4 container-cupones-previa">
                {/* Cupones */}
                <h3>Cupones</h3>
                <div className="cupones-previa">
                    <ListaCupones  cupones={cupones}/>
                </div>
            </div>
        </Perfil>
        </>
    );
}