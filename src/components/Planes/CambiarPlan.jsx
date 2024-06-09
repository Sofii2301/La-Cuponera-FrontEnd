import React from 'react';
import { Link } from 'react-router-dom';
import Plan from './Plan';

export default function CambiarPlan({ currentPlan }) {
    console.log("currentPlan cp: ", currentPlan)
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    {currentPlan === "" && (
                                            <div className="flex-container">
                                                <h3>Selecciona un plan:</h3>
                                                <Plan plan="plan1">
                                                    <Link to="https://lacuponera.digital/localizate/" className="btn btn-azul btnes-info-planes">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan2">
                                                    <Link to="https://lacuponera.digital/tu-tienda-online/" className="btn btn-azul btnes-info-planes">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan3">
                                                    <Link to="https://lacuponera.digital/tu-tienda-certificada/" className="btn btn-azul btnes-info-planes">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan4">
                                                    <Link to="https://lacuponera.digital/tu-tienda-premium/" className="btn btn-azul btnes-info-planes">
                                                        Comprar Plan
                                                    </Link>
                                                </Plan>
                                            </div>
                                        )}
                                        {currentPlan !== "" && (
                                            <div className="flex-container">
                                                <Plan plan="plan1" currentPlan={currentPlan}>
                                                    <Link to="https://lacuponera.digital/localizate/" className="btn btn-azul btnes-info-planes">
                                                        + INFO
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan2" currentPlan={currentPlan}>
                                                    <Link to="https://lacuponera.digital/tu-tienda-online/" className="btn btn-azul btnes-info-planes">
                                                        CAMBIAR A ESTE PLAN
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan3" currentPlan={currentPlan}>
                                                    <Link to="https://lacuponera.digital/tu-tienda-certificada/" className="btn btn-azul btnes-info-planes">
                                                    CAMBIAR A ESTE PLAN
                                                    </Link>
                                                </Plan>
                                                <Plan plan="plan4" currentPlan={currentPlan}>
                                                    <Link to="https://lacuponera.digital/tu-tienda-premium/" className="btn btn-azul btnes-info-planes">
                                                    CAMBIAR A ESTE PLAN
                                                    </Link>
                                                </Plan>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
