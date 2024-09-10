import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import MercadoPagoButton from "../../components/MercadoPagoButton";

const PaymentComponent = ({plan, vendedorId}) => {
    const [selectedPlan, setSelectedPlan] = useState("");
    const [nextPaymentDate, setNextPaymentDate] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [formValid, setFormValid] = useState(true);

    const [formData, setFormData] = useState({
        nombre: "",
        representante: "",
        email: "",
        pais: "",
        direccion: "",
        terminos: false,
    });

    useEffect(() => {
        const planOptions = {
            1: "basic",
            2: "gold",
            3: "premium",
            4: "snapAndReel",
            5: "adBoost",
            6: "brendIgnite",
        };
        setSelectedPlan(planOptions[plan] || "");
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

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handlePlanChange = (event) => {
        setSelectedPlan(event.target.value);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.nombre.trim()) {
            errors.nombre = "Por favor, ingresa el nombre de tu empresa.";
        }
        if (!formData.representante.trim()) {
            errors.representante = "Por favor, ingresa el nombre del representante legal.";
        }
        if (!formData.email.trim()) {
            errors.email = "Por favor, ingresa un email válido.";
        }
        if (!selectedPlan) {
            errors.plan = "Por favor, selecciona un plan.";
        }
        if (!formData.pais) {
            errors.pais = "Por favor, selecciona un país.";
        }
        if (!formData.direccion.trim()) {
            errors.direccion = "Por favor, ingresa la dirección de tu empresa.";
        }
        if (!formData.terminos) {
            errors.terminos = "Debes aceptar los Términos y Condiciones para continuar.";
        }

        setFormErrors(errors);
        setFormValid(Object.keys(errors).length === 0);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log("Formulario válido. Enviando datos...");
        } else {
            return;
        }
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
            <div className="p-4 d-flex justify-content-around flex-col">
                <form className="row needs-validation d-flex justify-content-around" onSubmit={handleSubmit} noValidate>
                    {/* Formulario de datos del vendedor */}
                    <div className="col-md-6 p-4 border rounded-md d-flex flex-column justify-content-around">
                        <h4>Datos del Vendedor</h4>
                        <div className="row py-2">
                            <label htmlFor="validationNombre" className="form-label">Nombre de la empresa</label>
                            <input 
                                type="text" 
                                className={`form-control ${formErrors.nombre ? "is-invalid" : ""}`} 
                                id="validationNombre" 
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required 
                                placeholder="Ingresa el nombre de tu empresa" 
                            />
                            <div className="valid-feedback"></div>
                            {formErrors.nombre && <div className="invalid-feedback">{formErrors.nombre}</div>}
                        </div>

                        <div className="row py-2">
                            <label htmlFor="validationCustom02" className="form-label">Representante legal</label>
                            <input 
                                type="text" 
                                className={`form-control ${formErrors.representante ? "is-invalid" : ""}`} 
                                id="validationCustom02" 
                                name="representante"
                                value={formData.representante}
                                onChange={handleInputChange}
                                placeholder="Ingresa el nombre del representante legal de la empresa" 
                                required 
                            />
                            <div className="valid-feedback"></div>
                            {formErrors.representante && <div className="invalid-feedback">{formErrors.representante}</div>}
                        </div>

                        <div className="row py-2">
                            <label htmlFor="validationDefault03" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className={`form-control ${formErrors.email ? "is-invalid" : ""}`} 
                                id="validationDefault03" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                                placeholder="Ingrese el email de la empresa" 
                            />
                            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                        </div>

                        <div className="row py-2">
                            <label htmlFor="validationServer04" className="form-label">Plan</label>
                            <select 
                                className={`form-select ${formErrors.plan ? "is-invalid" : ""}`} 
                                id="validationServer04"
                                name="plan"
                                value={selectedPlan} 
                                onChange={handlePlanChange} 
                                required
                            >
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
                            {formErrors.plan && <div className="invalid-feedback" id="validationServer04Feedback">{formErrors.plan}</div>}
                        </div>

                        <div className="row py-2">
                            <label htmlFor="validationServer05" className="form-label" noValidate>País</label>
                            <select 
                                className={`form-select ${formErrors.pais ? "is-invalid" : ""}`} 
                                id="validationServer05"
                                name="pais"
                                value={formData.pais}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Selecciona un pais</option>
                                <option value="arg">Argentina</option>
                                <option value="col">Colombia</option>
                            </select>
                            {formErrors.pais && <div className="invalid-feedback" id="validationServer05Feedback">{formErrors.pais}</div>}
                        </div>

                        <div className="row py-2">
                            <label htmlFor="validationCustom06" className="form-label">Dirección</label>
                            <input 
                                type="text" 
                                className={`form-control ${formErrors.direccion ? "is-invalid" : ""}`} 
                                id="validationCustom06"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                placeholder="Ingresa la dirección de tu empresa" 
                                required 
                            />
                            <div className="valid-feedback"></div>
                            {formErrors.direccion && <div className="invalid-feedback">{formErrors.direccion}</div>}
                        </div>
                    </div>

                    {/* Detalle del pedido */}
                    <div className="col-md-5 p-4 border rounded-md">
                        <h4>Detalle del Pedido</h4>
                        {selectedPlan && (
                            <div className="border p-3">
                                <h5>{planDetails[selectedPlan].name}</h5>
                                <p>Monto: ${planDetails[selectedPlan].price}</p>
                                <p><strong>Próximo pago:</strong> {nextPaymentDate}</p> {/* Muestra la fecha del próximo pago */}
                            </div>
                        )}

                        <div className="row py-2">
                            <div className="form-check">
                                <input 
                                    className={`form-check-input ${formErrors.terminos ? "is-invalid" : ""}`} 
                                    type="checkbox" 
                                    value="" 
                                    id="invalidCheck"
                                    name="terminos"
                                    checked={formData.terminos}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="invalidCheck">
                                    He leído y estoy de acuerdo con los términos y condiciones de la web.
                                </label>
                                {formErrors.terminos && <div className="invalid-feedback">{formErrors.terminos}</div>}
                            </div>
                        </div>
                        <button className="btn btn-primary mt-4" type="submit" onClick={handleSubmit}>
                            Confirmar datos y pagar
                        </button>
                    </div>
                </form>
                <div className="mt-3">
                    {/* Componente de Mercado Pago */}
                    <MercadoPagoButton
                        plan={planDetails[selectedPlan]}
                        email={formData.email}  // Datos del vendedor
                        vendedorId={vendedorId}  // ID del vendedor
                        className="mb-2 btn btn-amarillo w-100"
                        disabled={!formValid}
                    />
                    <Button className="btn btn-rosa w-100 border-0"  disabled={!formValid}>
                        Pagar con PayPal
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;