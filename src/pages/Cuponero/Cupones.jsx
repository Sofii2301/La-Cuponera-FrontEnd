import { useState, useEffect } from "react";
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
    const [cuponesFiltered, setFilteredCupones] = useState([]);

    const product = productData.map((item, index) => (
    <Product
        key={index}
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
                setCupones(allCoupons); // to catch initial data
                setFilteredCupones(allCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();
    }, []);
    
    const [applyFilters, setApplyFilters] = useState([]);
    
    const handleFilterChange = (category, filter) => {
      let newFilters;
      if (applyFilters.includes(filter)) {
        newFilters = applyFilters.filter(f => f !== filter);
      } else {
        newFilters = [...applyFilters, filter];
      }
      setApplyFilters(newFilters);
      
      if(newFilters.length > 0){
        const filteredData = cupones.filter(cupon =>
            newFilters.length === 0 || newFilters.includes(parseInt(cupon.categorias))
          );
        setFilteredCupones(filteredData);
      } else {
        setFilteredCupones(cupones);
      }
  
    };

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
                    <Filter onFilterChange={handleFilterChange}>
                        <Pagination items={cuponesFiltered} itemsPerPage={12} itemType='cupon' />
                    </Filter>
                </div>
                {/* <Filtro>
                </Filtro> */}
            </Cuponeros>
        </>
)
}