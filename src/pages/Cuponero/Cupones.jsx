import React, { useState, useEffect } from "react";
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../components/Cuponero/Product";
import Filtro from "../../components/Cuponero/Filtro"
import { productData, responsive } from "../../js/slider";
import "../../css/Cuponero/slider.css";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import { Divider } from "antd";
import { getCoupons } from "../../services/CuponesService";

export default function App() {
    const [cupones, setCupones] = useState([]);
    const product = productData.map((item) => (
    <Product
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
    />
    ));

    useEffect(() => {
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                setCupones(allCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();

        console.log('cupones data: ', cupones)
    }, []);

    return(
        <>
            <Cuponeros>
                <div className="cuponerosBg p-5 mt-3">
                    <Carousel className="carousel" showDots={true} responsive={responsive}>
                        {product}
                    </Carousel>
                </div>
                <div className="p-4">
                    <div className='cuponesTxt bg-white pt-3'>
                        <h1 className='titulo'>Cupones</h1>
                        <p>Conseguí cupones de tus productos favoritos</p>
                        <Divider/>
                    </div>
                    <Filter>
                        <Pagination items={cupones} itemsPerPage={12} itemType='cupon' />
                    </Filter>
                </div>
                {/* <Filtro>
                </Filtro> */}
            </Cuponeros>
        </>
)
}