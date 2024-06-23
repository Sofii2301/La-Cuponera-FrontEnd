import React from 'react';
import { Link } from 'react-router-dom';
import Plan from './Plan';

export default function CambiarPlan({ currentPlan }) {
    return (
        <>
            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <button className='titulo'>PLANES</button>
                            <div className="card-body">
                                <div className="panel profile-cover">     
                                    {currentPlan === "" && (
                                        <div className="sin-plan">
                                            <h3 className=' titulo'>Selecciona un plan:</h3>
                                            <div className="flex-container">
                                                <Plan plan="plan1">
                                                    <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3613" className="btn btn-azul btnes-info-planes fw-bold">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan2">
                                                    <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3614" className="btn btn-azul btnes-info-planes fw-bold">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan3">
                                                    <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3618" className="btn btn-azul btnes-info-planes fw-bold">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                            </div>
                                        </div>
                                        
                                    )}
                                    {currentPlan !== "" && (
                                        <div className="flex-container">
                                            <Plan plan="plan1" currentPlan={currentPlan}>
                                                <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3613" className="btn btn-azul btnes-info-planes">
                                                    {currentPlan==='plan1'? (<>+ INFO</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                </Link>
                                            </Plan>
                                            <Plan plan="plan2" currentPlan={currentPlan}>
                                                <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3614" className="btn btn-azul btnes-info-planes">
                                                    {currentPlan==='plan2'? (<>+ INFO</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                </Link>
                                            </Plan>
                                            <Plan plan="plan3" currentPlan={currentPlan}>
                                                <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3618" className="btn btn-azul btnes-info-planes">
                                                    {currentPlan==='plan3'? (<>+ INFO</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                </Link>
                                            </Plan>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h2 className='titulo'>PLANES</h2>
                            <div>
                                <div className="flex-container">
                                    <Plan plan="plan4">
                                        <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3613" className="btn btn-azul btnes-info-planes fw-bold">
                                            Comprar Plan
                                        </Link>
                                    </Plan>
                                    <Plan plan="plan5">
                                        <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3614" className="btn btn-azul btnes-info-planes fw-bold">
                                            Comprar Plan
                                        </Link>
                                    </Plan>
                                    <Plan plan="plan6">
                                        <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3618" className="btn btn-azul btnes-info-planes fw-bold">
                                            Comprar Plan
                                        </Link>
                                    </Plan>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
