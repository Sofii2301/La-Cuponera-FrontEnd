import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { getCouponById, getCouponImage } from "../../services/CuponesService";
import coupon_default from "../../assets/coupon_default.png";

export default function Carrito() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            if (cart.length > 0) {
                try {
                    // Obtenemos los datos de los cupones
                    const productPromises = cart.map(async (couponId) => {
                        let coupon, image;
                        try {
                            coupon = await getCouponById(couponId);
                            console.log('coupon: ',coupon)
                        } catch (error) {
                            console.error('Error al obtener los datos del cupón:', error);
                        }
                        try {
                            image = await getCouponImage(couponId);
                        } catch (error) {
                            console.error('Error al obtener la imagen del cupón:', error);
                        }
                        return { ...coupon[0], imageSrc: image, imageAlt: coupon[0].title };
                    });

                    // Resolviendo todas las promesas de los productos
                    const products = await Promise.all(productPromises);
                    console.log('products: ',products)

                    setProducts(products); 
                } catch (error) {
                    console.error('Error al obtener los productos del carrito:', error);
                }
            } else {
                setProducts([]); // Vaciar los productos si el carrito está vacío
            }
        };

        fetchCartProducts();
    }, []);

    const handleRemove = (couponId) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = cart.filter(id => id !== couponId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setProducts(products.filter(product => product.id !== couponId));
        } catch (error) {
            console.error('Error al eliminar el cupón del carrito:', error);
        }
    };

    return (
        <>
            <div className="mt-8 mb-5">
                <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {products.map((product) => (
                            <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {product.imageSrc ? (
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    ):(
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
                                                <Link to={`/cupon/${product.id}`}>{product.title}</Link>
                                            </h3>
                                            <p className="ml-4">{product.discount}%</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">${product.price - (product.price * product.discount)/100}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-end text-sm">
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="font-medium text-pink-600 hover:text-indigo-500"
                                                onClick={() => handleRemove(product.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
