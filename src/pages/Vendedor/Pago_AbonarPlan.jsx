import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagos from './Pagos';
import PaymentComponent from './PaymentComponent';
import { useAuth } from "../../services/AuthContext";
import { getVendedorById } from "../../services/vendedoresService";

export default function Pago_CambiarPlan() {
    const { plan } = useParams();

    return (
        <>
            <Pagos>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card custom-card">
                                <PaymentComponent plan={parseInt(plan)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Pagos>
        </>
    );
}
