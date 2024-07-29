import React, { useState, useEffect } from "react";
import { getVendedores, getVendedorById, getPlan } from '../../services/vendedoresService';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import Carrousel from "../../components/Carrousel";
import MapStores from '../../components/MapStores';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveCV } from "../../js/slider";
import Cupon from "../../components/Cupones/Cupon";
import Vendedor from "../../components/Cuponero/Vendedor";
import { getCouponImage, getCoupons } from "../../services/CuponesService";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon1 - lon2);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

export default function CercaAVos() {
    const [vendedores, setVendedores] = useState([]);
    const [cupones, setCupones] = useState([]);
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        const fetchAndSetCoupons = async () => {
            try {
                const allCoupons = await getCoupons();
                const filteredCoupons = await Promise.all(allCoupons.map(async (coupon) => {
                    let plan;
                    try {
                        plan = await getPlan(coupon.createdBy);
                    } catch (error) {
                        console.error('Error fetching vendor plan:', error);
                        return null;
                    }
                    if (plan === 2 || plan === 3) {
                        try {
                            const vendor = await getVendedorById(coupon.createdBy, 'Complete');
                            return { ...coupon, vendor };
                        } catch (error) {
                            console.error('Error fetching vendor:', error);
                            return null;
                        }
                    }
                    return null;
                }));
                setCupones(filteredCoupons.filter(coupon => coupon !== null));
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
                const filteredVendedores = await Promise.all(data.map(async (vendor) => {
                    let plan;
                    try {
                        plan = await getPlan(vendor.vendedor_id);
                    } catch (error) {
                        console.error('Error fetching vendor plan:', error);
                        return null;
                    }
                    if (plan === 2 || plan === 3) {
                        return vendor;
                    }
                    return null;
                }));
                setVendedores(filteredVendedores.filter(vendor => vendor !== null));
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    const sortedCupones = userPosition ? cupones.sort((a, b) => {
        const distanceA = calculateDistance(userPosition.lat, userPosition.lng, a.vendor.location.coordinates[0], a.vendor.location.coordinates[1]);
        const distanceB = calculateDistance(userPosition.lat, userPosition.lng, b.vendor.location.coordinates[0], b.vendor.location.coordinates[1]);
        return distanceA - distanceB;
    }) : cupones;

    const sortedVendedores = userPosition ? vendedores.sort((a, b) => {
        const distanceA = calculateDistance(userPosition.lat, userPosition.lng, a.location.coordinates[0], a.location.coordinates[1]);
        const distanceB = calculateDistance(userPosition.lat, userPosition.lng, b.location.coordinates[0], b.location.coordinates[1]);
        return distanceA - distanceB;
    }) : vendedores;

    const cupon = sortedCupones.map((item, index) => (
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

    const tienda = sortedVendedores.map((item, index) => (
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

    return (
        <>
            <Cuponeros>
                <div className="mt-0 pt-0 pb-0">
                    <Carrousel />
                </div>
                <div className="mt-2">
                    <MapStores setUserPosition={setUserPosition}></MapStores>
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
    );
}
