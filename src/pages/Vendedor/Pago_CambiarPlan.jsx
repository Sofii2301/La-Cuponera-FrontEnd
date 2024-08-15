import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagos from './Pagos';
import CambiarPlan from '../../components/Planes/CambiarPlan';
import { useAuth } from "../../services/AuthContext";
import { getVendedorById } from "../../services/vendedoresService";

export default function Pago_CambiarPlan() {
    const { plan } = useParams();
    return (
        <>
            <Pagos>
                <CambiarPlan currentPlan={parseInt(plan)}></CambiarPlan>
            </Pagos>
        </>
    );
}
