import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"

import cuponik from "../assets/cuponik/localizacion.png"
import winwin from "../assets/winwin/WinWinGrande.gif"
import RedesCupones from "../components/RedesCupones";
import Countdown from "../components/Countdown";

export default function PreLanzamiento() {
    const { type } = useParams();

    return (
        <>
        <div className="cont-img-lanz">
            {type === "vendedor" ? (
                <img className="cuponik-lanz" src={cuponik} />
            ) : (
                <img className="winwin-lanz" src={winwin} />
            )}
        </div>

        <RedesCupones/>

        <ContainerMap title="¡Muchas gracias por tu registro!" subtitle="Ahora perteneces a esta gran comunidad sustentable del futuro" imagen="cuponik-lanz-sm">
            <Countdown/>
            <p id="pie">Pronto {type === "vendedor" ? "tu tienda online de ofertas estará disponible para que vendas en el mundo digital todo el año directamente a tus clientes." : "estarás disfrutando de las mejores ofertas aquí, en un solo lugar, a un click!"}</p>
        </ContainerMap>
        </>
    );
}
