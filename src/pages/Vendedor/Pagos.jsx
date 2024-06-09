import React from 'react';
import { Link } from 'react-router-dom';
import Vendedor from '../../components/Vendedor/Vendedor';
import Plan3 from '../../components/Planes/Plan3';
import Plan2 from '../../components/Planes/Plan2';
import Plan from '../../components/Planes/Plan';
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
                                                <Plan currentPlan={currentPlan}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-5 col-11 col-cuponik-precio">
                                            <div className="container-cuponik-planes">
                                            {currentPlan === 'plan1' && (
                                                    <img 
                                                        className='cuponik-planes '
                                                        decoding="async" 
                                                        src="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-11.png" 
                                                        alt="Cuponik" 
                                                        srcset="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-11.png 477w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-11-281x300.png 281w" 
                                                        sizes="(max-width: 477px) 100vw, 477px"
                                                    /> 
                                                )}
                                                {currentPlan === 'plan2' && (
                                                    <img 
                                                        className='cuponik-planes '
                                                        decoding="async"  
                                                        src="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-12-974x1024.png"  
                                                        alt="Cuponik" 
                                                        srcset="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-12-974x1024.png 974w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-12-285x300.png 285w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-12-768x807.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-12-600x631.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-12.png 998w" 
                                                        sizes="(max-width: 974px) 100vw, 974px"
                                                    />
                                                )}
                                                {currentPlan === 'plan3' && (
                                                    <img 
                                                        className='cuponik-planes '
                                                        decoding="async"
                                                        src="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-13-974x1024.png" 
                                                        alt="Cuponik" 
                                                        srcset="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-13-974x1024.png 974w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-13-285x300.png 285w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-13-768x807.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-13-600x631.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-13.png 998w" 
                                                        sizes="(max-width: 974px) 100vw, 974px"
                                                    />
                                                )}
                                                {currentPlan === 'plan4' && (
                                                    <img 
                                                        className='cuponik-planes '
                                                        decoding="async" 
                                                        src="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14-1015x1024.png" 
                                                        alt="Cuponik" 
                                                        srcset="https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14-1015x1024.png 1015w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14-297x300.png 297w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14-150x150.png 150w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14-768x775.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14-600x605.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14-100x100.png 100w, https://lacuponera.digital/wp-content/uploads/2024/04/cuponik-nube-14.png 1040w" 
                                                        sizes="(max-width: 1015px) 100vw, 1015px"
                                                    />
                                                )}
                                                {/* <img className='cuponik-planes' src={cuponik} alt="Cuponik" /> */}
                                            </div>
                                            <div className="precio-pagos">
                                                {currentPlan === 'plan1' && (
                                                    <h1>15 USD</h1>
                                                )}
                                                {currentPlan === 'plan2' && (
                                                    <h1>25 USD + 1 USD por descarga de cupón</h1>
                                                )}
                                                {currentPlan === 'plan3' && (
                                                    <h1>45 USD + 1 USD por descarga de cupón</h1>
                                                )}
                                                {currentPlan === 'plan4' && (
                                                    <h1>150 USD + 1 USD por descarga de cupón</h1>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-tab tab-menu-heading">
                                    <nav className="nav main-nav-line tabs-menu profile-nav-line" role="tablist">
                                        <Link className={`nav-link ${location.pathname === '/vendedor/pagos/formas' ? 'active' : ''}`} to="/vendedor/pagos/formas" role="tab">Formas de pago</Link>
                                        <Link className={`nav-link ${location.pathname === '/vendedor/pagos/cambiar-plan' ? 'active' : ''}`} to="/vendedor/pagos/cambiar-plan" role="tab">Cambiar plan</Link>
                                        <Link className={`nav-link ${location.pathname === '/vendedor/pagos/historial' ? 'active' : ''}`} to="/vendedor/pagos/cuentas-bancarias" role="tab">Cuentas Bancarias</Link>
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
