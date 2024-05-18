import React, { useState, useEffect } from "react";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";

export default function Cupones_misCupones() {
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
            <Vendedor>
                <div className="container-mis-cupones">
                    <div className="container-mis-cupones-lista">
                        <ListaCupones  cupones={cupones}/>
                    </div>
                </div>
            </Vendedor>
        </>
    );
}