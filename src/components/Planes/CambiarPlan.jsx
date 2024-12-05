import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Plan from './Plan';

export default function CambiarPlan({ currentPlan }) {
    const intl = useIntl();

    const renderPlanOptions = (plan, buyLink, infoLink) => (
        <Plan plan={plan} currentPlan={currentPlan}>
            {plan != 3  ? (
                <Link
                    target='_blank'
                    to={buyLink}
                    className="btn btn-azul btnes-info-planes fw-bold mb-2"
                    style={{textTransform:'uppercase'}}
                >
                    {currentPlan === plan ? intl.formatMessage({ id: 'pay_for_plan', defaultMessage: 'Abonar plan' }) : intl.formatMessage({ id: 'change_to_this_plan', defaultMessage: 'Cambiar a este plan' })}
                </Link>
            ) : (
                <Link
                    target='_blank'
                    to={infoLink}
                    className="btn btn-azul btnes-info-planes"
                >
                    {intl.formatMessage({ id: 'more_information', defaultMessage: 'Más información' })}
                </Link>
            )}
        </Plan>
    );

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-12">
                    <div className="card custom-card">
                        <div className="card-body">
                            <div className="panel profile-cover">
                                <div className="sin-plan">
                                    <h3 className='titulo'>{intl.formatMessage({ id: 'select_plan', defaultMessage: 'Elige un plan' })}:</h3>
                                    <div className="flex-container">
                                        {renderPlanOptions(3, "https://lacuponera.digital/producto/localizate-en-el-mapa/", "https://lacuponera.digital/producto/localizate-en-el-mapa/")}
                                        {renderPlanOptions(1, "https://lacuponera.digital/producto/marketplace/", "https://lacuponera.digital/producto/marketplace/")}
                                        {renderPlanOptions(2, "https://lacuponera.digital/producto/marketplace-premium/", "https://lacuponera.digital/producto/marketplace-premium/")}
                                    </div>
                                </div>
                                {/*(!currentPlan || currentPlan === 0 || currentPlan === undefined) ? (
                                    <div className="sin-plan">
                                        <h3 className='titulo'>{intl.formatMessage({ id: 'select_plan', defaultMessage: 'Elige un plan' })}:</h3>
                                        <div className="flex-container">
                                            {renderPlanOptions(3, "https://lacuponera.digital/producto/plan-localizacion/", "https://lacuponera.digital/localizacion/")}
                                            {renderPlanOptions(1, "https://lacuponera.digital/producto/plan-basic/", "https://lacuponera.digital/plan-basic-2/")}
                                            {renderPlanOptions(2, "https://lacuponera.digital/producto/plan-gold/", "https://lacuponera.digital/plan-tienda-gold/")}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="con-plan">
                                        <h3 className='titulo'>{intl.formatMessage({ id: 'my_plan', defaultMessage: 'Mi plan' })}:</h3>
                                        <div className="flex-container">
                                            {renderPlanOptions(3, "https://lacuponera.digital/producto/plan-localizacion/", "https://lacuponera.digital/localizacion/")}
                                            {renderPlanOptions(1, "https://lacuponera.digital/producto/plan-basic/", "https://lacuponera.digital/plan-basic-2/")}
                                            {renderPlanOptions(2, "https://lacuponera.digital/producto/plan-gold/", "https://lacuponera.digital/plan-tienda-gold/")}
                                        </div>
                                    </div>
                                )*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
