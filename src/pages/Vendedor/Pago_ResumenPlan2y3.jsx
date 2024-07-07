import React, { useState, useEffect } from "react";
//import { getPaymentStatus, markPaymentAsDone, cancelVendorPlan } from "../../services/paymentService";
import { useAuth } from '../../services/AuthContext';
import { getAllRaiting } from "../../services/CuponesService";
import { getVendedorById } from "../../services/vendedoresService";
import Pagos from './Pagos';

export default function ResumenCobroVentas() {
    const [totalSales, setTotalSales] = useState(0);
    const [totalAmountDue, setTotalAmountDue] = useState(0);
    const [sales, setSales] = useState([]);
    //const [paymentStatus, setPaymentStatus] = useState(null);
    const { authState } = useAuth();
    const vendedorId = authState.user;

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const sales = await getSalesByVendor(vendedorId);
                setSales(sales);

                const totalSalesCount = sales.length;
                setTotalSales(totalSalesCount);
                
                const totalAmount = totalSalesCount * 1; // $1 por cada venta
                setTotalAmountDue(totalAmount);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        /*const fetchPaymentStatus = async () => {
            try {
                const status = await getPaymentStatus(vendedorId);
                setPaymentStatus(status);
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        };*/

        fetchSalesData();
        //fetchPaymentStatus();
    }, [vendedorId]);

    const getSalesByVendor = async (vendorId) => {
        try {
            const ratings = await getAllRaiting();
            const sales = [];
    
            for (const rating of ratings) {
                const coupon = await getCouponById(rating.couponId);
                if (coupon.createdBy === vendorId) {
                    const vendor = await getVendedorById(vendorId);
                    sales.push({
                        ...rating,
                        coupon,
                        vendor,
                        price: coupon.price
                    });
                }
            }
    
            return sales;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            throw error;
        }
    };

    /*const handlePayment = async () => {
        try {
            await markPaymentAsDone(vendedorId);
            setPaymentStatus({ paid: true });
            console.log("Pago realizado");
        } catch (error) {
            console.error('Error al realizar el pago:', error);
        }
    };

    useEffect(() => {
        if (paymentStatus && !paymentStatus.paid) {
            cancelVendorPlan(vendedorId).then(() => {
                console.log("Plan cancelado por falta de pago");
            }).catch(error => {
                console.error('Error al cancelar el plan:', error);
            });
        }
    }, [paymentStatus, vendedorId]);*/

    return (
        <Pagos>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card p-5">
                            <h6><strong>Resumen de Ventas y Cobros</strong></h6>
                            <p>Total Ventas: {totalSales}</p>
                            <p>Monto a Pagar: ${totalAmountDue}</p>
                            {/* {paymentStatus && paymentStatus.paid ? (
                                <p>Pago realizado este mes</p>
                            ) : (
                                <button onClick={handlePayment} className="btn btn-primary">Realizar Pago</button>
                            )} */}
                            <button className="btn btn-amarillo mt-3">Realizar Pago</button>
                        </div>
                    </div>
                </div>
            </div>
        </Pagos>
        
    );
}
