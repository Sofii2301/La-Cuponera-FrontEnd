import React from "react";
import { Link } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"

export default function ForgotPassword(props) {

    return(
        <>
        <ContainerMap title="¿Olvidaste tu contraseña?" subtitle="Ingresá tu dirección de correo electrónico asociado a la cuenta y te enviaremos un enlace para que puedas restablecer tu contraseña." isSignIn="registro" >
            <form className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="formForgetEmail" className="form-label visually-hidden">Email</label>
                        <input type="email" className="form-control" id="formForgetEmail" placeholder="Email" required />
                        <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                    </div>
                    <div className="col-12 d-grid gap-2">
                        <button type="submit" className="btn btn-rosa">Restablecer contraseña</button>
                        <Link to="signin/" className="btn btn-azul">Volver a Iniciar Sesión</Link>
                    </div>
                </div>
            </form>
        </ContainerMap>        
        </>
    )
}