import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCoupons } from '../../services/CuponesService';
import ListaCupones from '../../components/Cupones/ListaCupones';
import Cuponeros from '../../components/Cuponero/Cuponeros';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
    const query = useQuery();
    const search = query.get('q');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchAndSetCoupons = async () => {
            if (search) {
                try {
                    const allCoupons = await getCoupons();
                    const resultsData = allCoupons.filter((coupon) =>
                        coupon.title.toLowerCase().includes(search.toLowerCase()) ||
                        coupon.categorias.toLowerCase().includes(search.toLowerCase())
                    );
                    setResults(resultsData);
                } catch (error) {
                    console.error('Error fetching coupons:', error);
                }
            }
        };

        fetchAndSetCoupons();
    }, [search]);

    return (
        <Cuponeros>
            <h1>Resultados de búsqueda para: {search}</h1>
            {results.length > 0 ? (
                <ListaCupones listaCupones={results} />
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </Cuponeros>
    );
}
