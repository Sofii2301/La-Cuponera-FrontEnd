import React from 'react';
import { Link } from 'react-router-dom';
import Plan from './Plan';

export default function CambiarPlan({ currentPlan }) {
    const handleLogout = () => {
        const res = logout();
        if(res){
            navigate("/signin/vendedor");
        }
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <button className='titulo'>PLANES</button>
                            <div className="card-body">
                                <div className="panel profile-cover">     
                                    {currentPlan === 0 && (
                                        <div className="sin-plan">
                                            <h3 className=' titulo'>Selecciona un plan:</h3>
                                            <div className="flex-container">
                                                <Plan plan="1">
                                                    <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3613" onClick={handleLogout}  className="btn btn-azul btnes-info-planes fw-bold">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                                <Plan plan="2">
                                                    <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3614" onClick={handleLogout}  className="btn btn-azul btnes-info-planes fw-bold">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                                <Plan plan="3">
                                                    <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3618" onClick={handleLogout}  className="btn btn-azul btnes-info-planes fw-bold">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                            </div>
                                        </div>
                                    )}
                                    {currentPlan !== 0 && (
                                        <div className="flex-container">
                                            <Plan plan={1} currentPlan={currentPlan}>
                                                <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3613" onClick={handleLogout}  className="btn btn-azul btnes-info-planes">
                                                    {currentPlan===1? (<>+ INFO</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                </Link>
                                            </Plan>
                                            <Plan plan={2} currentPlan={currentPlan}>
                                                <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3614" onClick={handleLogout}  className="btn btn-azul btnes-info-planes">
                                                    {currentPlan===2? (<>+ INFO</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                </Link>
                                            </Plan>
                                            <Plan plan={3} currentPlan={currentPlan}>
                                                <Link to="https://lacuponera.digital/finalizar-compra/?add-to-cart=3618" onClick={handleLogout}  className="btn btn-azul btnes-info-planes">
                                                    {currentPlan===3? (<>+ INFO</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                </Link>
                                            </Plan>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h2 className='titulo'>PLANES</h2>
                            <div>
                                <div className="flex-container">
                                    <Plan plan={4}>
                                        <Link to="https://lacuponera.digital/plan-marcaredes/" onClick={handleLogout} className="btn btn-azul btnes-info-planes fw-bold">
                                            Comprar Plan
                                        </Link>
                                    </Plan>
                                    <Plan plan={5}>
                                        <Link to="https://lacuponera.digital/plan-fotovideo/" onClick={handleLogout}  className="btn btn-azul btnes-info-planes fw-bold">
                                            Comprar Plan
                                        </Link>
                                    </Plan>
                                    <Plan plan={6}>
                                        <Link to="https://lacuponera.digital/plan-ads/" onClick={handleLogout}  className="btn btn-azul btnes-info-planes fw-bold">
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
