import React, { useState, useEffect } from "react";
import logo from "../../assets/logo_default.png";

export default function ListaCupones({ cupones, onCuponUpdated, onCuponDeleted }) {
    useEffect(() => {
        return () => {
            // Limpiar URLs de objetos creados
            cupones.forEach(cupon => {
                if (cupon.image instanceof File) {
                    URL.revokeObjectURL(cupon.image);
                }
            });
        };
    }, [cupones]);
    
    return (
        <ul className="list-group">
            {cupones.map((cupon, index) => {
                console.log("Valor de cupon.image:", cupon.image);
                return (
                    <li key={index} className="list-group-item">
                        <h3>{cupon.title}</h3>
                        <p>{cupon.description}</p>
                        <p>Descuento: {cupon.discount}%</p>
                        <p>Vencimiento: {cupon.expirationDate}</p>
                        {cupon.image ? (
                            <img src={typeof cupon.image === 'string' ? cupon.image : (cupon.image instanceof File ? URL.createObjectURL(cupon.image) : '')} alt="Cupon" />
                            //<img src={cupon.image} alt="Cupon" />
                        ) : (
                            <img src={logo} alt="Portada" className="img-fluid" />
                        )}
                        
                        <button onClick={() => onCuponUpdated(index)} className="btn btn-primary me-2">Editar</button>
                        <button onClick={() => onCuponDeleted(index)} className="btn btn-danger">Eliminar</button>
                    </li>
                );
            })}
        </ul>
    );
}
