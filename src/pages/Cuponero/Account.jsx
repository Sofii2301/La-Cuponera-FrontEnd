import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import { getCuponeroById } from "../../services/cuponerosService"; 
import "../../css/Cuponero/account.css"

export default function Account() {
    const { id } = useParams();  // Obtener el ID del cuponero desde la URL
    const [cuponero, setCuponero] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCuponero = async () => {
            if (!id) {
                setError(new Error("ID de cuponero no proporcionado"));
                return;
            }

            try {
                const data = await getCuponeroById(id);  // Usar el ID del cuponero
                setCuponero(data);
            } catch (err) {
                setError(err);
            }
        };

        fetchCuponero();
    }, [id]);

    const changePassword = () => {
        // lógica para cambiar la contraseña
    };

    const deleteAccount = () => {
        // lógica para eliminar la cuenta
    };

    return (
        <Cuponeros>
            <div className="p-4 flex bg-white align-items-center justify-content-center mt-5" style={{ minHeight: '350px' }}>
                <Card className="cardAccount">
                    <Card.Body className="text-center">
                        <Card.Title className="text-center mb-3 titulo cardTitulo">Mi cuenta
                        </Card.Title>
                        {error ? (
                            <div>Error: {error.message}</div>
                        ) : cuponero ? (
                            <>
                            <div className="cardInfo">
                                <p>Nombre:</p> 
                                <label>{cuponero.nombre}</label>
                                <p>Email:</p>
                                <label>{cuponero.email}</label>
                            </div>
                            </>
                        ) : (
                            <div>Cargando...</div>
                        )}
                        <div className="cardButtons">
                        <Link to={`/cuponero/mi-cuenta/${id}/editar`}><Button variant="outline-primary" className="w-full mb-3" onClick={changePassword}>Editar datos de perfil</Button></Link>
                            <Button variant="outline-primary" className="w-full mb-3" onClick={changePassword}>Cambiar de contraseña</Button>
                            <Button variant="outline-danger" className="w-full mb-3" onClick={deleteAccount}>Eliminar cuenta</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Cuponeros>
    );
}
