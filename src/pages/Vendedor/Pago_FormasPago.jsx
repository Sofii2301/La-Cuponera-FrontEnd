import React from 'react';
import Pagos from './Pagos';

export default function FormasPago() {
    return (
        <>
            <Pagos>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="row container-formp">
                                        <div className="titulo-descrip-formp">
                                            <span className="titulo-formp" >
                                                <h1>Agregar forma de pago</h1>
                                            </span>
                                            <div className="">
                                                <div className="" role="tooltip">
                                                    Agrega una forma de pago ahora para que tu próxima compra sea más rápida y sencilla.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row content-formp">
                                            <div className="row-formp descrip-formp">
                                                <span>Agrega una forma de pago a tu cuenta. Solo La Cuponera puede ver tu información de pago.</span>
                                            </div>
                                            <button className="row-formp btn btn-rosa">
                                                <i className="bi bi-credit-card icon-formp"></i>
                                                <div className="">Agregar tarjeta de crédito o débito</div>
                                            </button>
                                            <button className="row-formp btn btn-azul">
                                                <i className="bi bi-chat-square-dots icon-formp"></i>
                                                <div className="">Canjear código</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Pagos>
        </>
    );
}
