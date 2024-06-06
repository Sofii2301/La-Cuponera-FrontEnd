import React from 'react';
import { Link } from 'react-router-dom';
import Pagos from './Pagos';
import CambiarPlan from '../../components/Planes/CambiarPlan';

export default function Pago_CambiarPlan({ currentPlan }) {
    //currentPlan = "plan1";
    return (
        <>
            <Pagos>
                <CambiarPlan></CambiarPlan>
            </Pagos>
        </>
    );
}
