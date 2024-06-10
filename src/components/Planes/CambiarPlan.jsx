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
                            <div className="card-body">
                                <div className="panel profile-cover">
                                                <h3 className=' titulo'>Selecciona un plan:</h3>
                                    {currentPlan === "" && (<div className="flex-container">
    <Plan plan="plan1">
        <Link to="https://lacuponera.digital/localizate/" className="btn btn-azul btnes-info-planes fw-bold">
            Comprar Plan
        </Link>
    </Plan>
    <Plan plan="plan2">
        <Link to="https://lacuponera.digital/tu-tienda-online/" className="btn btn-azul btnes-info-planes fw-bold">
            Comprar Plan
        </Link>
    </Plan>
    <Plan plan="plan3">
        <Link to="https://lacuponera.digital/tu-tienda-certificada/" className="btn btn-azul btnes-info-planes fw-bold">
            Comprar Plan
        </Link>
    </Plan>
    <Plan plan="plan4">
        <Link to="https://lacuponera.digital/tu-tienda-premium/" className="btn btn-azul btnes-info-planes fw-bold">
            Comprar Plan
        </Link>
    </Plan>
</div>
                                        
                                        )}
                                        {currentPlan !== "" && (
                                            <div className="container">
                                            <div className="row">
                                                <div className="col-12 col-md-6 mb-3">
                                                    <Plan plan="plan1">
                                                        <Link to="https://lacuponera.digital/localizate/" className="btn btn-azul btnes-info-planes fw-bold">
                                                            Comprar Plan
                                                        </Link>
                                                    </Plan>
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <Plan plan="plan2">
                                                        <Link to="https://lacuponera.digital/tu-tienda-online/" className="btn btn-azul btnes-info-planes fw-bold">
                                                            Comprar Plan
                                                        </Link>
                                                    </Plan>
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <Plan plan="plan3">
                                                        <Link to="https://lacuponera.digital/tu-tienda-certificada/" className="btn btn-azul btnes-info-planes fw-bold">
                                                            Comprar Plan
                                                        </Link>
                                                    </Plan>
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <Plan plan="plan4">
                                                        <Link to="https://lacuponera.digital/tu-tienda-premium/" className="btn btn-azul btnes-info-planes fw-bold">
                                                            Comprar Plan
                                                        </Link>
                                                    </Plan>
                                                </div>
                                            </div>
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
