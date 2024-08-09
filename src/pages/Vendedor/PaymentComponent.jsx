import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentComponent = ({plan}) => {
    const [selectedPlan, setSelectedPlan] = useState("");
    const [nextPaymentDate, setNextPaymentDate] = useState("");

    useEffect(() => {
        if (plan === 0) {
            setSelectedPlan('basic');
        }
        if (plan === 1) {
            setSelectedPlan('basic');
        }
        if (plan === 2) {
            setSelectedPlan('gold');
        }
        if (plan === 3) {
            setSelectedPlan('premium');
        }
        if (plan === 4) {
            setSelectedPlan('snapAndReel');
        }
        if (plan === 5) {
            setSelectedPlan('adBoost');
        }
        if (plan === 6) {
            setSelectedPlan('brendIgnite');
        }
        if (plan && planDetails[plan]) {
            setSelectedPlan(plan);
        }
    }, [plan]);

    useEffect(() => {
        // Calcular la fecha del próximo pago (30 días después de la fecha actual)
        const currentDate = new Date();
        const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
        const formattedDate = nextDate.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        setNextPaymentDate(formattedDate);
    }, []);

    const handlePlanChange = (event) => {
        setSelectedPlan(event.target.value);
    };

    const planDetails = {
        basic: { name: "Plan Basic", price: 30 },
        gold: { name: "Plan Gold", price: 60 },
        premium: { name: "Plan Premium", price: 180 },
        snapAndReel: { name: "Snap & Reel", price: 130 },
        adBoost: { name: "Ad Boost", price: 160 },
        brendIgnite: { name: "Brend Ignite", price: 90 },
    };

    return (
        <div className="container mt-5">
            <h2 className="titulo fs-50">Abonar plan</h2>
            <div className="p-4 d-flex justify-content-around">
                {/* Formulario de datos del vendedor */}
                <div className="row-md-6 p-4 border rounded-10">
                    <h4>Datos del Vendedor</h4>
                    <form class="col d-flex flex-column justify-content-around needs-validation" novalidate>
                        <div class="row py-2">
                            <label for="validationNombre" class="form-label">Nombre de la empresa</label>
                            <input type="text" class="form-control" id="validationNombre" required placeholder="Ingresa el nombre de tu empresa" />
                            <div class="valid-feedback"></div>
                        </div>

                        <div class="row py-2">
                            <label for="validationCustom02" class="form-label">Representante legal</label>
                            <input type="text" class="form-control" id="validationCustom02" placeholder="Ingresa el nombre del representante legal de la empresa" required />
                            <div class="valid-feedback"></div>
                        </div>

                        <div class="row py-2">
                        <label for="validationDefault03" class="form-label">Email</label>
                            <input type="email" class="form-control" id="validationDefault03" required placeholder="Ingrese el email de la empresa" />
                        </div>

                        <div class="row py-2">
                            <label for="validationServer04" class="form-label" novalidate>País</label>
                            <select class="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" value={selectedPlan} onChange={handlePlanChange} required>
                                <option value="" disabled>Selecciona tu Plan</option>
                                <option value="basic">Plan Basic - $30/mes</option>
                                <option value="gold">Plan Gold - $60/mes</option>
                                <option value="premium">Plan Premium - $180/mes</option>
                                <option value="snapAndReel">Snap & Reel - $130/mes</option>
                                <option value="adBoost">Ad Boost - $160/mes</option>
                                <option value="brendIgnite">
                                    Brend Ignite - $90 pago único
                                </option>

                            </select>
                            {/* <div id="validationServer04Feedback" class="invalid-feedback">
                                Por favor selecciona un plan.
                            </div> */}
                        </div>

                        <div class="row py-2">
                            <label for="validationServer05" class="form-label" novalidate>País</label>
                            <select class="form-select is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required>
                                <option value="" disabled>Selecciona un pais</option>
                                <option value="arg">Argentina</option>
                                <option value="col">Colombia</option>
                            </select>
                            {/* <div id="validationServer05Feedback" class="invalid-feedback">
                                Por favor selecciona un país.
                            </div> */}
                        </div>

                        <div class="row py-2">
                            <label for="validationCustom06" class="form-label">Dirección</label>
                            <input type="text" class="form-control" id="validationCustom06" placeholder="Ingresa la dirección de tu empresa" required />
                            <div class="valid-feedback"></div>
                        </div>

                        
                    </form>
                </div>

                {/* Detalle del pedido */}
                <div className="col-md-5 p-4 border rounded-10">
                    <h4>Detalle del Pedido</h4>
                    {selectedPlan && (
                        <div className="border p-3">
                            <h5>{planDetails[selectedPlan].name}</h5>
                            <p>Precio: ${planDetails[selectedPlan].price}</p>
                            <p><strong>Próximo pago:</strong> {nextPaymentDate}</p> {/* Muestra la fecha del próximo pago */}
                        </div>
                    )}

                    <div class="row py-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required checked/>
                            <label className="form-check-label" for="invalidCheck">
                                He leído y estoy de acuerdo con los términos y condiciones de la web.
                            </label>
                            <div className="invalid-feedback">
                                Debes aceptar los Términos y Condiciones para continuar.
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <Button className="mb-2 btn btn-amarillo w-100">
                            Pagar con Mercado Pago
                        </Button>
                        <Button className="btn btn-rosa w-100 border-0">Pagar con PayPal</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;