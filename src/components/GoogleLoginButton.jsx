// src/components/GoogleLoginButton.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import google from "../assets/icon-google.png"
import { clientId } from '../../config';

const GoogleLoginButton = () => {
  const onSuccess = (response) => {
    console.log('Login Success:', response);
    // Aquí puedes enviar el token al backend para verificar y crear una sesión
  };

  const onFailure = (response) => {
    console.log('Login failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
        render={(renderProps) => (
            <button
                type="button"
                id="registro-google"
                className="btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
            >
                <img src={google} alt="Google" />
                <p>Registrate con Google</p>
            </button>
        )}
        onSuccess={onSuccess}
        onError={onFailure}
    />
    </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
