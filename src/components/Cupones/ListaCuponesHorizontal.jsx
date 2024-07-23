import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getCouponById, getCouponImage } from "../../services/CuponesService";
import coupon_default from "../../assets/coupon_default.png";

// eslint-disable-next-line react/prop-types
const ListaCupones = ({ listaCupones }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cupones, setCupones] = useState([]);

    const fetchCuponesDataeImagen = async () => {
        if (listaCupones.length > 0) {
            try {
                const productPromises = listaCupones.map(async (cupon) => {
                    let coupon, image;
                    try {
                        coupon = await getCouponById(cupon.id);
                    } catch (error) {
                        console.error('Error al obtener los datos del cupón:', error);
                    }
                    try {
                        image = await getCouponImage(cupon.id);
                    } catch (error) {
                        console.error('Error al obtener la imagen del cupón:', error);
                    }
                    return { ...coupon[0], imageSrc: image, imageAlt: coupon[0].title };
                });

                const cupones = await Promise.all(productPromises);
                setCupones(cupones);
            } catch (error) {
                console.error('Error al obtener los datos de los cupones:', error);
            }
        } else {
            setCupones([]);
        }
    };

    useEffect(() => {
        fetchCuponesDataeImagen();
    }, [listaCupones]);
    
    return (
        <>
            <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cupones && cupones.length > 0 ? (
                        cupones.map(coupon => (
                            <Link to={`/cupon/${coupon.id}`} key={coupon.id}>
                                <li className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        {coupon.imageSrc ? (
                                            <img
                                                src={coupon.imageSrc}
                                                alt={coupon.imageAlt}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        ) : (
                                            <img
                                                src={coupon_default}
                                                alt='Cupon'
                                                className="h-full w-full object-cover object-center"
                                            />
                                        )}
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to={`/cupon/${coupon.id}`}>{coupon.title}</Link>
                                                </h3>
                                                <p className="ml-4">{coupon.discount}%</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">${coupon.price - (coupon.price * coupon.discount) / 100}</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))
                    ) : (
                        <p>Aún no hay cupones</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default ListaCupones;
