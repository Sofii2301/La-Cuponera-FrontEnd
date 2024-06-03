import React from 'react';
import Pagos from './Pagos';

export default function CuentasBancarias() {
    return (
        <>
            <Pagos>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12">
                        <div class="card custom-card"> 
                            <div class="card-header  border-bottom-0 pb-0"> 
                                <div>
                                    <div class="d-flex">
                                        <label class="main-content-label my-auto pt-2 pb-2">Cuentas Bancarias</label> 
                                    </div>
                                </div>
                            </div> 
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="row container-formp">
                                        <div className="titulo-descrip-formp">
                                            <span className="titulo-formp" >
                                                <h1>Agregar Cuenta Bancaria</h1>
                                            </span>
                                            <div className="">
                                                <div className="" role="tooltip">
                                                    Agrega una cuenta bancaria ahora para recibir tu paga lo antes posible.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row content-formp">
                                            <div className="row-formp descrip-formp">
                                                <span>Agrega una cuenta bancaria para recibir tu pago. Solo La Cuponera puede ver tu información.</span>
                                            </div>
                                            <button className="row-formp btn btn-rosa">
                                                <i className="bi bi-plus-circle icon-formp"></i>
                                                <div className="">Agendar nueva cuenta</div>
                                            </button>
                                            <div className="row-formp cuenta-bancaria p-4">
                                                <label htmlFor="cuentaBancaria" className='mb-1'>Registrá cuenta bancaria o billetera virtual</label>
                                                <input type="text" placeholder='Cbu/Cvu/Alias'/>
                                            </div>
                                            <div className="row-formp cuenta-bancaria p-4">
                                                <h3 className=""><i className="bi bi-wallet2"></i> Billetera Virtual</h3>
                                                <div className=""><strong>Mercado Pago</strong></div>
                                                <div className=""><strong>CBU: 00000000000000000000000</strong></div>
                                            </div>
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
