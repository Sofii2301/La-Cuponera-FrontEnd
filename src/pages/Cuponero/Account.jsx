import { Button } from "bootstrap";
import { Card } from "react-bootstrap";

export default function Account(){

    const changePassword = () => {

    }
    const deleteAccount = () => {

    }
    return(
        <Card>
            <Button onClick={() => changePassword()}>Cambio de contrasenia</Button>
            <Button onClick={() => deleteAccount()}>Eliminar cuenta</Button>
        </Card>
    )
}