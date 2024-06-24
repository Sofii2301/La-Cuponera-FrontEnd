import React, { useState, useEffect } from "react";
import { getCoupons } from '../../services/CuponesService';
import { getVendedores } from '../../services/vendedoresService';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../components/Cuponero/Product";
import { productData, responsive } from "../../js/slider";
import { Divider } from "antd";

export default function Tiendas() {
    const [vendedores, setVendedores] = useState([]);

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

    const product = productData.map((item, index) => (
        <Product
            key={index}
            name={item.name}
            url={item.imageurl}
            price={item.price}
            description={item.description}
        />
        ));

    return(
        <>
            <Cuponeros>
                <div className="mt-3 p-5">
                    <Carousel className="carousel" showDots={true} responsive={responsive}>
                        {product}
                    </Carousel>
                </div>
                <div className="p-4">
                    <div className='cuponesTxt bg-white pt-3'>
                        <h1 className='titulo'>Tiendas Certificadas</h1>
                        <p className="tiendasP">Encontrá todos los cupones de las tiendas certificadas de nuestra página</p>
                        <Divider/>
                    </div>
                    <Filter title="Tiendas">
                        <Pagination items={vendedores} itemsPerPage={12} itemType='vendedor' />
                    </Filter>
                </div>
            </Cuponeros>
         </>
    )
}