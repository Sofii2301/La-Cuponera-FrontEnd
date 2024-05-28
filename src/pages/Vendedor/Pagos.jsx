import React from 'react';
import { Link } from 'react-router-dom';
import Vendedor from '../../components/Vendedor/Vendedor';
import Plan3 from '../../components/Planes/Plan3';
import Plan2 from '../../components/Planes/Plan2';
import Plan1 from '../../components/Planes/Plan1';
import Plan4 from '../../components/Planes/Plan4';
import cuponik from "../../assets/cuponik/Web1.png"

export default function Pagos({ children, currentPlan }) {
    currentPlan = "plan1";
    return (
        <Vendedor>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="container-pagos">
                                        <div className="col-lg-4 col-md-6 col-11 col-miplan miplan">
                                            <h1 className='titulo titulo-miplan'>Mi plan</h1>
                                            <div className="current-plan">
                                                {currentPlan === 'plan1' && (
                                                    <Plan1/>
                                                )}
                                                {currentPlan === 'plan2' && (
                                                    <Plan2/>
                                                )}
                                                {currentPlan === 'plan3' && (
                                                    <Plan3/>
                                                )}
                                                {currentPlan === 'plan4' && (
                                                    <Plan4/>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-11 col-cuponik-precio">
                                            <div className="container-cuponik-planes">
                                                <img 
                                                    className='cuponik-planes '
                                                    decoding="async" 
                                                    src="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-11.png" 
                                                    alt="Cuponik" 
                                                    srcset="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-11.png 477w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-11-281x300.png 281w" 
                                                    sizes="(max-width: 477px) 100vw, 477px"
                                                />
                                                {/* <img className='cuponik-planes' src={cuponik} alt="Cuponik" /> */}
                                            </div>
                                            <div className="precio-pagos">
                                                <h1>10 USD</h1>
                                            </div>
                                        </div>
                                        
                                        
                                        
                                    </div>
                                    
                                </div>
                                <div className="profile-tab tab-menu-heading">
                                    <nav className="nav main-nav-line p-3 tabs-menu profile-nav-line" role="tablist">
                                        <Link className="nav-link" to="/vendedor/pagos/formas" role="tab">Formas de pago</Link>
                                        <Link className="nav-link" to="/vendedor/pagos/cambiar-plan" role="tab">Cambiar plan</Link>
                                        <Link className="nav-link" to="/vendedor/pagos/historial" role="tab">Historial de pedidos y presupuesto</Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </Vendedor>
    );
}
