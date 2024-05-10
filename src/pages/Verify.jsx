import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"

export default function Verify() {
  const { userType, email } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    try {
      // Realizar la verificación del token
      const response = await fetch("http://localhost:9000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          token: token
        })
      });
      const data = await response.json();

      if (response.ok) {
        // Si la verificación fue exitosa
        setVerificationStatus("verified");
        // Redirigir a la página de agradecimiento indicando que se verificó la cuenta
        
        navigate(`/${userType}`)
        //navigate(`/thank-you/${userType}?verified=true`);
      } else {
        // Si la verificación falló
        setVerificationStatus("failed");
        setErrorMessage(data.message); // Usar el mensaje de error recibido del servidor
      }
    } catch (error) {
      console.error("Error al verificar el token:", error);
      // Manejar el error de verificación
      setVerificationStatus("error");
      setErrorMessage("Error interno del servidor. Inténtalo de nuevo más tarde.");
    }
  };

  const handleLater = () => {
    // Si el usuario desea verificar en otro momento
    // Redirigir a la página de agradecimiento indicando que no se verificó la cuenta
    navigate(`/thank-you/${userType}?verified=false`);
    //navigate(`/${userType}`)
  };

  return (
      <>
      <ContainerMap title="Verificar Cuenta" subtitle="Ingresa el código de verificación que recibiste por correo electrónico para verificar tu cuenta" isSignIn="sesion" >
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        <div className="mb-3">
          <label htmlFor="verificationToken" className="form-label visually-hidden">Código de Verificación</label>
          <input
            type="text"
            className="form-control"
            id="verificationToken"
            placeholder="Código de Verificación"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button onClick={handleVerify} className="btn btn-rosa">Verificar Cuenta</button>
          <button onClick={handleLater} className="btn btn-azul">Verificar en otro momento</button>
        </div>
        {verificationStatus === "failed" && <p>Error: No se pudo verificar el token.</p>}
        {verificationStatus === "error" && <p>{errorMessage}</p>}
      </ContainerMap>
    </>
  );
}
