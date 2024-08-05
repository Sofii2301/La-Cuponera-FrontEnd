import React, { useEffect, useState } from "react";
import Carrusel from "../../components/Carrousel";
import Pagination from "../../components/Pagination";
import { useParams } from "react-router-dom";
import Cuponeros from "../../components/Cuponero/Cuponeros";
import { filterCouponsByCategories } from "../../services/CuponesService";
import { filterVendorsByCategories } from "../../services/vendedoresService";

const CategoryPage = () => {
    const { category, type } = useParams(); // Suponiendo que la categoría viene de la URL
    const [cupones, setCupones] = useState([]);
    const [tiendas, setTiendas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('category: ', category)
                if (type === 'cupones') {
                    const filteredCoupons = await filterCouponsByCategories([category]);
                    console.log('filteredCoupons: ', filteredCoupons)
                    setCupones(filteredCoupons);
                } else {
                    const filteredStores = await filterVendorsByCategories([category]);
                    setTiendas(filteredStores);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [category]);

    return (
        <Cuponeros>
            <Carrusel categoria={category} />
            <div className="container mt-3">
                {type === 'cupones' ? (
                    <>
                        <h2>Cupones en "{category}"</h2>
                        <Pagination items={cupones} itemsPerPage={12} itemType='cupon' />
                    </>
                ):(
                    <>
                        <h2>Tiendas en "{category}"</h2>
                        <Pagination items={tiendas} itemsPerPage={12} itemType='vendedor' />
                    </>
                )}
            </div>
        </Cuponeros>
    );
};

export default CategoryPage;
