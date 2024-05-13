import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import SeccionCargaCupones from "../../components/Vendedor/SeccionCargaCupones";
import ListaCupones  from "../../components/Vendedor/ListaCupones";

export default function Cupones_editarCupones() {
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        const savedCupones = JSON.parse(localStorage.getItem("cupones")) || [];
        setCupones(savedCupones);
    }, []);

    const handleCuponAdded = (newCupon) => {
        const updatedCupones = [...cupones, newCupon];
        setCupones(updatedCupones);
        localStorage.setItem("cupones", JSON.stringify(updatedCupones));
    };

    const handleCuponUpdated = (index) => {
        // Implementa la lógica para editar el cupón en base al índice
    };

    const handleCuponDeleted = (index) => {
        const updatedCupones = cupones.filter((cupon, i) => i !== index);
        setCupones(updatedCupones);
        localStorage.setItem("cupones", JSON.stringify(updatedCupones));
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
                    <div className="col-5">
                        <div className="mb-5 mt-5">
                            <h2>Cupones Agregados</h2>
                        </div>
                        <ListaCupones cupones={cupones} onCuponUpdated={handleCuponUpdated} onCuponDeleted={handleCuponDeleted} />
                    </div>
                </div>
            </div>
            </Vendedor>
        </>
    );
}