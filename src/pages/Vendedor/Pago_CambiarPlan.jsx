import React from 'react';
import { Link } from 'react-router-dom';
import Pagos from './Pagos';
import Plan3 from '../../components/Planes/Plan3';
import Plan2 from '../../components/Planes/Plan2';
import Plan1 from '../../components/Planes/Plan1';
import Plan4 from '../../components/Planes/Plan4';

export default function CambiarPlan({ currentPlan }) {
    currentPlan = "plan1";
    return (
        <>
            <Pagos>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="flex-container">
                                        <Plan1 currentPlan={currentPlan}>
                                            <Link to="https://lacuponera.digital/localizate/" className="btn btn-amarillo btnes-info-planes">
                                                + INFO
                                            </Link>
                                        </Plan1>
                                        <Plan2 currentPlan={currentPlan}>
                                            <Link to="https://lacuponera.digital/tu-tienda-online/" className="btn btn-azul btnes-info-planes">
                                                CAMBIAR A ESTE PLAN
                                            </Link>
                                        </Plan2>
                                        <Plan3 currentPlan={currentPlan}>
                                            <Link to="https://lacuponera.digital/tu-tienda-certificada/" className="btn btn-azul btnes-info-planes">
                                            CAMBIAR A ESTE PLAN
                                            </Link>
                                        </Plan3>
                                        <Plan4 currentPlan={currentPlan}>
                                            <Link to="https://lacuponera.digital/tu-tienda-premium/" className="btn btn-azul btnes-info-planes">
                                            CAMBIAR A ESTE PLAN
                                            </Link>
                                        </Plan4>
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
