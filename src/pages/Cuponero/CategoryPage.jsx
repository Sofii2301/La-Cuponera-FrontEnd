import React, { useEffect, useState } from "react";
import { useIntl } from 'react-intl';
import Carrusel from "../../components/Carrousel";
import Pagination from "../../components/Pagination";
import { useParams } from "react-router-dom";
import { filterCouponsByCategories } from "../../services/CuponesService";
import { filterVendorsByCategories } from "../../services/vendedoresService";

const CategoryPage = () => {
    const intl = useIntl();
    const { category, type } = useParams(); // Suponiendo que la categoría viene de la URL
    const [cupones, setCupones] = useState([]);
    const [tiendas, setTiendas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type === 'cupones') {
                    const filteredCoupons = await filterCouponsByCategories([category]);
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
        <>
            <Carrusel categoria={category} />
            <div className="container mt-3">
                {type === 'cupones' ? (
                    <>
                        <h2>{intl.formatMessage({ id: 'coupons_in', defaultMessage: 'Cupones en ' })}"{category}"</h2>
                        <Pagination items={cupones} itemsPerPage={12} itemType='cupon' />
                    </>
                ):(
                    <>
                        <h2>{intl.formatMessage({ id: 'stores_in', defaultMessage: 'Tiendas en ' })}"{category}"</h2>
                        <Pagination items={tiendas} itemsPerPage={12} itemType='vendedor' />
                    </>
                )}
            </div>
        </>
    );
};

export default CategoryPage;
