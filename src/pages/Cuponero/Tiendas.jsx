import React, { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import { filterVendorsByCategories, getMasPopulares, getMejoresPuntuados, getNewStores, getVendedores } from '../../services/vendedoresService';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../components/Cuponero/Product";
import { useProductData , responsive } from "../../js/slider";
import { Divider } from "antd";

export default function Tiendas() {
    const intl = useIntl();
    const [vendedores, setVendedores] = useState([]);
    const [vendedoresFiltered, setFilteredVendedores] = useState([]);
    const [applyFilters, setApplyFilters] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");
    const productData = useProductData();

    useEffect(() => {
        const fetchAndSetVendedores = async () => {
            try {
                const data = await getVendedores('Complete');
                setVendedores(data);
                setFilteredVendedores(data)
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    const handleFilterChange = (sectionId, label) => {
        let newFilters;
    
        if (applyFilters.includes(label)) {
            newFilters = applyFilters.filter(f => f !== label);
        } else {
            newFilters = [...applyFilters, label];
        }
    
        setApplyFilters(newFilters);
        filterVendedores(newFilters, selectedSort);
    };    

    const handleSortChange = async (sortOption) => {
        setSelectedSort(sortOption);
        filterVendedores(applyFilters, sortOption);
    };

    const filterVendedores = async (filters, sortOption) => {
        let filteredData;
        if (selectedSort || applyFilters) {
            filteredData = vendedoresFiltered;
        } else {
            filteredData = vendedores;
        }

        // Filtrar por categorías
        if (filters.length > 0) {
            filteredData = await filterVendorsByCategories(filters, filteredData);
        } else {
            filteredData = vendedores;
        }

        // Ordenar según la opción seleccionada
        if (sortOption === intl.formatMessage({ id: 'most_popular', defaultMessage: 'Más Populares' })) {
            filteredData = await getMasPopulares(filteredData);
        } else if (sortOption === intl.formatMessage({ id: 'best_rated', defaultMessage: 'Mejor Puntuados' })) {
            filteredData = await getMejoresPuntuados(filteredData);
        } else if (sortOption === intl.formatMessage({ id: 'most_recent', defaultMessage: 'Mas recientes' })) {
            filteredData = await getNewStores(filteredData);
        } else {
            filteredData = vendedores;
        }

        setFilteredVendedores(filteredData);
    };

    const product = productData.map((item, index) => (
        <Product
            key={index}
            name={item.name}
            url={item.imageurl}
            price={item.price}
            description={item.description}
            type='vendedor'
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
                        <h1 className='titulo'>{intl.formatMessage({ id: 'certified_stores_title', defaultMessage: 'Tiendas certificadas' })}</h1>
                        <p className="tiendasP">{intl.formatMessage({ id: 'certified_stores_description', defaultMessage: 'Encontrá todos los cupones de las tiendas certificadas de nuestra página' })}</p>
                        <Divider/>
                    </div>
                    <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} type='tiendas'>
                        <Pagination items={vendedoresFiltered} itemsPerPage={12} itemType='vendedor' />
                    </Filter>
                </div>
            </Cuponeros>
         </>
    )
}