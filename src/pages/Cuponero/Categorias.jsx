
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../components/Cuponero/Product";
import Filtro from "../../components/Cuponero/Filtro"
import { productData, responsive } from "../../js/slider";
import "../../css/Cuponero/slider.css";

export default function App() {
    const product = productData.map((item) => (
    <Product
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
    />
    ));


    return(
        <>
            <Cuponeros>
                <div className="cuponerosBg">
                        <Carousel className="carousel" showDots={true} responsive={responsive}>
                        {product}
                        </Carousel>
                </div>
                <Filtro>
                </Filtro>
            </Cuponeros>
        </>
)
}