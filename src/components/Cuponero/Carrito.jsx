import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { getCouponById, getCouponImage } from "../../services/CuponesService";
import { getCuponeroById, updateCuponero } from "../../services/cuponerosService";

export default function Carrito() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [cuponero, setCuponero] = useState({});

    useEffect(() => {
        const fetchCuponero = async () => {
            try {
                const data = await getCuponeroById(user);
                setCuponero(data)
            } catch (error) {
                console.error('Error al obtener los datos del cuponero:', error);
            }
        };

        fetchCuponero();
    }, [user]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (cuponero.cart && cuponero.cart.length > 0) {
                try {
                    // Obtenemos los datos de los cupones
                    const productPromises = cuponero.cart.map(async (couponId) => {
                        const coupon = await getCouponById(couponId);
                        const image = await getCouponImage(couponId);
                        return { ...coupon, imageSrc: image, imageAlt: coupon.title };
                    });

                    // Resolviendo todas las promesas de los productos
                    const products = await Promise.all(productPromises);

                    setProducts(products); 
                } catch (error) {
                    console.error('Error al obtener los productos del carrito:', error);
                }
            } else {
                setProducts([]); // Vaciar los productos si el carrito está vacío
            }
        };

        fetchCartProducts();
    }, [cuponero]);

    const handleRemove = async (couponId) => {
        try {
            const updatedCart = cuponero.cart.filter(id => id !== couponId);
            const updatedUser = {
                cart: updatedCart
            };
            const updatedCuponero = await updateCuponero(cuponero._id, updatedUser);
            setCuponero(updatedCuponero);
            setProducts(products.filter(product => product._id !== couponId));
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
                            <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link to={`/cupon/${product._id}`}>{product.title}</Link>
                                            </h3>
                                            <p className="ml-4">{product.discount}%</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-end text-sm">
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="font-medium text-pink-600 hover:text-indigo-500"
                                                onClick={() => handleRemove(product._id)}
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
