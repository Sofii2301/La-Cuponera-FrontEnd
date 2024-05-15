import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import SeccionCargaCupones from "../../components/Vendedor/SeccionCargaCupones";
import ListaCupones from "../../components/Vendedor/ListaCupones";

export default function Cupones_editarCupones() {
    const navigate = useNavigate();
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        // Obtener los cupones del vendedor desde localStorage
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData && vendedorData.cupones) {
            setCupones(vendedorData.cupones);
        }
    }, []);

    const handleCuponAdded = (newCupon) => {
        const updatedCupones = [...cupones, newCupon];
        setCupones(updatedCupones);
        // Actualizar los cupones en localStorage
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData) {
        localStorage.setItem(
            "vendedorData",
            JSON.stringify({ ...vendedorData, cupones: updatedCupones })
        );
        }
    };

    const handleCuponUpdated = (index) => {
        // Implementa la lógica para editar el cupón en base al índice
    };

    const handleCuponDeleted = (index) => {
        const updatedCupones = cupones.filter((cupon, i) => i !== index);
        setCupones(updatedCupones);
        // Actualizar los cupones en localStorage
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData) {
        localStorage.setItem(
            "vendedorData",
            JSON.stringify({ ...vendedorData, cupones: updatedCupones })
        );
        }
    };

    return (
        <>
            <Vendedor>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-5">
                            <div className="mb-5 mt-5">
                                <h2>Crear Nuevo Cupón</h2>
                            </div>
                            <SeccionCargaCupones onCuponAdded={handleCuponAdded} />
                        </div>
                        <div className="col-7">
                            <div className="mb-5 mt-5">
                                <h2>Cupones Agregados</h2>
                            </div>
                            <div className="container-cupones-editar">
                                <ListaCupones cupones={cupones} onCuponUpdated={handleCuponUpdated} onCuponDeleted={handleCuponDeleted} />
                            </div>
                        </div>
                    </div>
                </div>
            </Vendedor>
        </>
    );
}
