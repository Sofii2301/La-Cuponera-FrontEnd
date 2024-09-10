import React from "react";
import { useParams } from "react-router-dom";
import Pagos from './Pagos';
import PaymentComponent from './PaymentComponent';

export default function Pago_CambiarPlan() {
    const { plan, id } = useParams();

    return (
        <>
            <Pagos>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card custom-card">
                                <PaymentComponent plan={parseInt(plan)} vendedorId={parseInt(id)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Pagos>
        </>
    );
}
