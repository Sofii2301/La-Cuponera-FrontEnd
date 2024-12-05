import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagos from './Pagos';
import Vendedor from '../../components/Vendedor/Vendedor';
import CambiarPlan from '../../components/Planes/CambiarPlan';

export default function Pago_CambiarPlan() {
    const { plan } = useParams();
    return (
        <>
            {/*<Pagos>
                <CambiarPlan currentPlan={parseInt(plan)}></CambiarPlan>
            </Pagos>*/}
            <Vendedor>
                <CambiarPlan currentPlan={parseInt(plan)}></CambiarPlan>
            </Vendedor>
        </>
    );
}
