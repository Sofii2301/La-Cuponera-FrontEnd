import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagos from './Pagos';

export default function ResumenCobroVentas() {
    return (
        <Pagos>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card p-5">
                            <h4><strong>Mi Página Web</strong></h4>
                            <p>Proximamente con tu Plan Premium podrás tener tu propia página web hecha en WordPress. Pronto te brindaremos un link a WhatsApp para que puedas contactar con nosotros y gestionar la web a tu gusto. Además tendrás publicidad en nuestras redes sociales con trafico directo a tu web para impulsar tu negocio al máximo. ¡Muchas gracias por elegirnos!</p>
                            <Link /*to={`https://wa.me/`}*/ className="btn btn-success disabled mt-3">
                                Obtener mi pagina web
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Pagos>
        
    );
}
