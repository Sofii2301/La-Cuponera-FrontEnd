import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { FaHome, FaUserAlt, FaRegChartBar, FaRegCreditCard } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Carrito() {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate(); // Hook para navegar programáticamente

    // Lista de productos de ejemplo
    const products = [
        { id: 1, name: "Product 1", price: 50, quantity: 1, imageSrc: "https://via.placeholder.com/150", imageAlt: "Product 1", to: "/product/1" },
        { id: 2, name: "Product 2", price: 30, quantity: 2, imageSrc: "https://via.placeholder.com/150", imageAlt: "Product 2", to: "/product/2" },
        { id: 3, name: "Product 3", price: 40, quantity: 1, imageSrc: "https://via.placeholder.com/150", imageAlt: "Product 3", to: "/product/3" },
    ];

    // Calcular el subtotal
    const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    return (
        <>
            <button className="" type="button" onClick={handleShow}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </button>
            <Offcanvas className="offcanvas-end" placement="end" show={showSidebar} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product.id} className="flex py-6">
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
                                                        <Link to={product.to}>{product.name}</Link>
                                                    </h3>
                                                    <p className="ml-4">${product.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Categoria {product.quantity}</p>
                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
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

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500"></p>
                        <div className="mt-6">
                            <Link
                                to="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Realizar compra
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                o{' '}
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => setShowSidebar(false)}
                                >
                                    Continuar comprando
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
