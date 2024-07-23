import React, { useState, useEffect } from "react";
import { getVendedores } from '../../services/vendedoresService';
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carrousel from "../../components/Carrousel"
import MapStores from '../../components/MapStores'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  responsiveCV } from "../../js/slider";
import Cupon from "../../components/Cupones/Cupon";
import Vendedor from "../../components/Cuponero/Vendedor"
import { getCouponImage, getCoupons } from "../../services/CuponesService";

export default function CercaAVos() {
    const [vendedores, setVendedores] = useState([]);
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        const fetchAndSetCoupons = async () => {
            try {
                const allCoupons = await getCoupons();
                setCupones(allCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchAndSetCoupons();
    }, []);

    useEffect(() => {
        const fetchAndSetVendedores = async () => {
            try {
                const data = await getVendedores('Complete');
                setVendedores(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    const cupon = cupones.map((item, index) => (
        <div key={index} className="carousel-item-wrapper">
            <Cupon
                discount={item.discount}
                id={item.id}
                categorias={item.categorias}
                title={item.title}
                raiting={item.raiting}
                price={item.price}
            />
        </div>
    ));

    const tienda = vendedores.map((item, index) => (
        <div key={index} className="carousel-item-wrapper">
            <Vendedor
                id={item.vendedor_id}
                vendedor_id={item.vendedor_id}
                nombreTienda={item.nombreTienda}
                categorias={item.categorias}
                raiting={item.raiting}
            />
        </div>
    ));

    return(
        <>
            <Cuponeros>
                <div className="mt-0 pt-0 pb-0">
                    <Carrousel/>
                </div> 
                <div className="mt-2">
                    <MapStores></MapStores>
                </div>
                <div className="mt-5 ml-3 pt-0 pb-5 carousel-cupones">
                    <h3>Cupones destacados: </h3>
                    <Carousel className="carousel-cupones" itemClass="carousel-item-custom" showDots={true} responsive={responsiveCV}>
                    {cupon}
                    </Carousel>
                </div>
                <div className="mt-3 ml-3 pt-5 pb-5 carousel-vendedores">
                    <h3>Tiendas certificadas: </h3>
                    <Carousel className="carousel-vendedores" itemClass="carousel-item-custom" showDots={true} responsive={responsiveCV}>
                    {tienda}
                    </Carousel>
                </div>
            </Cuponeros>
    </>
    )
}