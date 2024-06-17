import React, { useState, useEffect } from "react";
import { getVendedores } from '../../services/vendedoresService';
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carrousel from "../../components/Carrousel"
import MapStores from '../../components/MapStores'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { cuponesData } from "../../js/cupones";
import {  responsive } from "../../js/slider";
import ListaCupones from "../../components/Cupones/ListaCupones";
import Cupon from "../../components/Cupones/Cupon";
import Vendedor from "../../components/Cuponero/Vendedor"


export default function CercaAVos(props) {
    const [vendedores, setVendedores] = useState([]);

    const cupon = cuponesData.map((item) => (
        <Cupon
            image={item.image}
            discount={item.discount}
            categorias={item.categorias}
            title={item.title}
            price={item.price}
            raiting={item.raiting}
        />
    ));

    const tienda = vendedores.map((item) => (
        <Vendedor
            nombreTienda={item.nombreTienda}
            categorias={item.categorias}
            raiting={item.raiting}
        />
    ));

    useEffect(() => {
        const fetchAndSetVendedores = async () => {
            try {
                const data = await getVendedores();
                console.log('Vendedores data:', data);
                setVendedores(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    return(
        <>
            <Cuponeros>
                <div className="mt-5 ps-5 pe-5">
                    <Carrousel/>
                </div> 
                <div className="mt-5">
                    <MapStores></MapStores>
                </div>
                <div className="mt-3 p-5 carousel-cupones">
                    <h3>Cupones destacados: </h3>
                    <Carousel className="carousel-cupones" itemClass="carousel-item-custom" showDots={true} responsive={responsive}>
                    {cupon}
                    </Carousel>
                </div>
                <div className="mt-3 p-5 carousel-vendedores">
                    <h3>Tiendas certificadas: </h3>
                    <Carousel className="carousel-vendedores" itemClass="carousel-item-custom" showDots={true} responsive={responsive}>
                    {tienda}
                    </Carousel>
                </div>
            </Cuponeros>
        </>
    )
}