import { Card } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Cuponeros from "../../components/Cuponero/Cuponeros"

export default function Account(){

    const changePassword = () => {

    }
    const deleteAccount = () => {

    }
    return(
        <Cuponeros>
            <div className="p-4 flex bg-white align-items-center justify-content-center mt-5" style={{ minHeight: '350px' }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body className="text-center">
                        <Card.Title className="text-center mb-3">Mi cuenta</Card.Title>
                        <Button variant="outline-primary" className="w-full mb-3">Cambiar de contraseña</Button>
                        <Button variant="outline-danger" className="w-full mb-3">Eliminar cuenta</Button>
                    </Card.Body>
                </Card>
            </div>
        </Cuponeros>
    )
}