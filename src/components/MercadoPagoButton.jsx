import React from 'react';

const PagoConMercadoPago = ({ plan, email, vendedorId }) => {
    const handlePago = async () => {
        //console.log(plan, email, vendedorId)
        try {
            const response = await fetch('http://localhost:5000/api/mercadopago/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: vendedorId,
                    title: plan.name,
                    unit_price: 0.01,//plan.price,
                    quantity: 1,
                    email: email
                }),
            });

            const data = await response.json();

            if (data && data.response) {
                // Redirigir al usuario a la URL de MercadoPago
                window.location.href = data.response.body.init_point;
            } else {
                console.error('Error al crear la preferencia de pago');
            }
        } catch (error) {
            console.error('Error al procesar el pago', error);
        }
    };

    return (
        <button onClick={handlePago}>
            Pagar con MercadoPago
        </button>
    );
};

export default PagoConMercadoPago;
