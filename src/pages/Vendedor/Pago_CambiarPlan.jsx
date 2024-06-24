import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Pagos from './Pagos';
import CambiarPlan from '../../components/Planes/CambiarPlan';
import { useAuth } from "../../services/AuthContext";
import { getVendedorById } from "../../services/vendedoresService";

export default function Pago_CambiarPlan() {
    const { user } = useAuth();
    const [currentPlan, setCurrentPlan] = useState(0);
    const vendedorId = String(user);
    useEffect(() => {
        const fetchVendedorData = async () => {
            try {
                const data_email = await getVendedorById(vendedorId);
                setCurrentPlan(data_email.plan);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };
        
        fetchVendedorData();
    }, [currentPlan]);
    return (
        <>
            <Pagos>
                <CambiarPlan currentPlan={currentPlan}></CambiarPlan>
            </Pagos>
        </>
    );
}
