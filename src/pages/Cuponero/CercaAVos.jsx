import React, { useState, useEffect } from "react";
import { getVendedores } from '../../services/vendedoresService';
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carrousel from "../../components/Carrousel"
import MapStores from '../../components/MapStores'
import Pagination from "../../components/Pagination"


export default function CercaAVos(props) {
    const [vendedores, setVendedores] = useState([]);

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
                <div className="mt-3 p-5">
                    Vendedores destacados:
                    <Pagination items={vendedores} itemsPerPage={12} itemType='vendedor' />
                </div>
            </Cuponeros>
        </>
    )
}