import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_default.png"
import { getLogoImage } from "../../services/vendedoresService";
import Raiting from '../Raiting'

export default function Vendedor(vendedor) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const image = await getLogoImage(vendedor.id);
                if (image) {
                    setImage(image);
                } else {
                    setImage(null);
                }
            } catch (error) {
                console.error('Error al obtener la imagen del cupón:', error);
            }
        };

        if (vendedor.id) {
            fetchImage();
        }
    }, [vendedor.id]);

    return ( 
        <Link to={`/cuponero/perfil-vendedor/${vendedor.id}`}>
            <div className="flex items-center vendedor-lt product-grid-lc">
                <img className="rounded-full" src={image || logo} alt="" />
                <div className="categoria-lc w-100">{vendedor.categorias ? vendedor.categorias.join(', ') : 'Categorias'}</div>
                <div>
                    <h3 className="text-base text-center font-semibold leading-7 tracking-tight text-gray-900">{vendedor.nombreTienda}</h3>
                    <Raiting vendedorId={vendedor.id}/>
                </div>
            </div>
        </Link>
    );
}