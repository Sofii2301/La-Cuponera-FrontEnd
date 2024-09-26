import React from 'react';
import { Link } from 'react-router-dom';
import Plan from './Plan';

export default function CambiarPlan({ currentPlan }) {
    console.log('currentPlan: ', currentPlan)
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
                            <div className="card-body">
                                <div className="panel profile-cover">     
                                    {(currentPlan === 0 || currentPlan === null || currentPlan === undefined) && (
                                        <div className="sin-plan">
                                            <h3 className=' titulo'>Elige un plan:</h3>
                                            <div className="flex-container">
                                                <Plan plan="3">
                                                    <Link target='_blank' to="https://lacuponera.digital/producto/plan-localizacion/" className="btn btn-azul btnes-info-planes fw-bold mb-2">
                                                        Comprar Plan
                                                    </Link>
                                                    <Link to="https://lacuponera.digital/localizacion/" className="btn btn-azul btnes-info-planes">
                                                        Más información
                                                    </Link>
                                                </Plan>
                                                <Plan plan="1">
                                                    <Link target='_blank' to="https://lacuponera.digital/producto/plan-basic/" className="btn btn-azul btnes-info-planes fw-bold mb-2">
                                                        Comprar Plan
                                                    </Link>
                                                    <Link target='_blank' to="https://lacuponera.digital/plan-basic-2/" className="btn btn-azul btnes-info-planes">
                                                        Más información
                                                    </Link>
                                                </Plan>
                                                <Plan plan="2">
                                                    <Link target='_blank' to="https://lacuponera.digital/producto/plan-gold/" className="btn btn-azul btnes-info-planes fw-bold mb-2">
                                                        Comprar Plan
                                                    </Link>
                                                    <Link target='_blank' to="https://lacuponera.digital/plan-tienda-gold/" className="btn btn-azul btnes-info-planes">
                                                        Más información
                                                    </Link>
                                                </Plan>
                                            </div>
                                        </div>
                                    )}
                                    {((currentPlan !== 0) && (currentPlan !== null) && (currentPlan !== undefined)) && (
                                        <div className="con-plan">
                                            <h3 className=' titulo'>Mi plan:</h3>
                                            <div className="flex-container">
                                                <Plan plan={3} currentPlan={currentPlan}>
                                                    <Link target='_blank' to="https://lacuponera.digital/producto/plan-localizacion/"  className="btn btn-azul btnes-info-planes mb-2">
                                                        {currentPlan===3? (<>ABONAR PLAN</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                    </Link>
                                                    <Link target='_blank' to="https://lacuponera.digital/localizacion/" className="btn btn-azul btnes-info-planes">
                                                        Más información
                                                    </Link>
                                                </Plan>
                                                <Plan plan={1} currentPlan={currentPlan}>
                                                    <Link target='_blank' to="https://lacuponera.digital/producto/plan-basic/" className="btn btn-azul btnes-info-planes mb-2">
                                                        {currentPlan===1? (<>ABONAR PLAN</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                    </Link>
                                                    <Link target='_blank' to="https://lacuponera.digital/plan-basic-2/" className="btn btn-azul btnes-info-planes">
                                                        Más información
                                                    </Link>
                                                </Plan>
                                                <Plan plan={2} currentPlan={currentPlan}>
                                                    <Link target='_blank' to="https://lacuponera.digital/producto/plan-gold/"  className="btn btn-azul btnes-info-planes mb-2">
                                                        {currentPlan===2? (<>ABONAR PLAN</>) : (<>CAMBIAR A ESTE PLAN</>)}
                                                    </Link>
                                                    <Link target='_blank' to="https://lacuponera.digital/plan-tienda-gold/" className="btn btn-azul btnes-info-planes">
                                                        Más información
                                                    </Link>
                                                </Plan>
                                            </div>
                                        </div>
                                    )}
                                    {/* <h2 className='titulo'>PLANES Desarrollo de Marca</h2>
                                    <div>
                                        <div className="flex-container">
                                            <Plan plan={4}>
                                                <Link to="/vendedor/pagos/abonar-plan/4"  className="btn btn-azul btnes-info-planes mb-2">
                                                    Comprar Plan
                                                </Link>
                                                <Link to="https://lacuponera.digital/plan-marcaredes/" className="btn btn-azul btnes-info-planes fw-bold">
                                                    Más información
                                                </Link>
                                            </Plan>
                                            <Plan plan={5}>
                                            <Link to="/vendedor/pagos/abonar-plan/5"  className="btn btn-azul btnes-info-planes mb-2">
                                                    Comprar Plan
                                                </Link>
                                                <Link to="https://lacuponera.digital/plan-fotovideo/" className="btn btn-azul btnes-info-planes fw-bold">
                                                    Más información
                                                </Link>
                                            </Plan>
                                            <Plan plan={6}>
                                                <Link to="/vendedor/pagos/abonar-plan/6"  className="btn btn-azul btnes-info-planes mb-2">
                                                    Comprar Plan
                                                </Link>
                                                <Link to="https://lacuponera.digital/plan-ads/" className="btn btn-azul btnes-info-planes fw-bold">
                                                    Más información
                                                </Link>
                                            </Plan>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
