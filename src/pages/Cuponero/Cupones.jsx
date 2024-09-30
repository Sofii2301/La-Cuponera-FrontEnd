import { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../components/Cuponero/Product";
import { useProductData , responsive } from "../../js/slider";
import "../../css/Cuponero/slider.css";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import { Divider } from "antd";
import { getCoupons, getMasPopulares, getMejoresPuntuados, getNewCoupons, getCouponsByPriceAsc, getCouponsByPriceDesc, filterCouponsByCategories, filterCouponsByCategoriesAndCoupons } from "../../services/CuponesService";

export default function Cupones() {
    const intl = useIntl();
    const [cupones, setCupones] = useState([]);
    const [cuponesFiltered, setFilteredCupones] = useState([]);
    const [applyFilters, setApplyFilters] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");
    const productData = useProductData();

    useEffect(() => {
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                setCupones(allCoupons); // to catch initial data
                setFilteredCupones(allCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();
    }, []);

    const handleFilterChange = (sectionId, label) => {
        let newFilters;
    
        if (applyFilters.includes(label)) {
            newFilters = applyFilters.filter(f => f !== label);
        } else {
            newFilters = [...applyFilters, label];
        }
    
        setApplyFilters(newFilters);
        filterCoupons(newFilters, selectedSort);
    };    

    const handleSortChange = async (sortOption) => {
        setSelectedSort(sortOption);
        filterCoupons(applyFilters, sortOption);
    };

    const filterCoupons = async (filters, sortOption) => {
        let filteredData;
        if (selectedSort || applyFilters) {
            filteredData = cuponesFiltered;
        } else {
            filteredData = cupones;
        }

        // Filtrar por categorías
        if (filters.length > 0) {
            filteredData = await filterCouponsByCategoriesAndCoupons(filters, filteredData);
        } else {
            filteredData = cupones;
        }

        // Ordenar según la opción seleccionada
        if (sortOption === intl.formatMessage({ id: 'most_popular', defaultMessage: 'Mas Populares' })) {
            filteredData = await getMasPopulares(filteredData);
        } else if (sortOption === intl.formatMessage({ id: 'best_rated', defaultMessage: 'Mejor Puntuados' })) {
            filteredData = await getMejoresPuntuados(filteredData);
        } else if (sortOption === intl.formatMessage({ id: 'most_recent', defaultMessage: 'Mas recientes' })) {
            filteredData = await getNewCoupons(filteredData);
        } else if (sortOption === intl.formatMessage({ id: 'price_low_to_high', defaultMessage: 'Precio: menor a mayor' })) {
            filteredData = await getCouponsByPriceAsc(filteredData);
        } else if (sortOption === intl.formatMessage({ id: 'price_hight_to_low', defaultMessage: 'Precio: mayor a menor' })) {
            filteredData = await getCouponsByPriceDesc(filteredData);
        } else {
            filteredData = cupones;
        }

        setFilteredCupones(filteredData);
    };

    const product = productData.map((item, index) => (
        <Product key={index} name={item.name} url={item.imageurl} type='cupon'/>
    ));

    return (
        <>
            <Cuponeros>
                <div className="cuponerosBg p-5 mt-3">
                    <Carousel className="carousel" showDots={true} responsive={responsive}>
                        {product}
                    </Carousel>
                </div>
                <div className="p-4">
                    <div className='cuponesTxt bg-white pt-3'>
                        <h1 className='titulo'>{intl.formatMessage({ id: 'coupons', defaultMessage: 'Cupones' })}</h1>
                        <p>{intl.formatMessage({ id: 'gwt_coupons_favorite_products', defaultMessage: 'Conseguí cupones de tus productos favoritos' })}</p>
                        <Divider />
                    </div>
                    <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} type='cupones'>
                        <Pagination items={cuponesFiltered} itemsPerPage={12} itemType='cupon' />
                    </Filter>
                </div>
            </Cuponeros>
        </>
    );
}
