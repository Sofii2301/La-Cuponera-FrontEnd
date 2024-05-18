// src/components/FacebookLoginButton.jsx
import React, { useEffect } from 'react';
import face from "../assets/icon-face.png" 

const FacebookLoginButton = () => {
    const appId = 'TU_APP_ID';

    useEffect(() => {
        // Inicializar el SDK de Facebook
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: appId,
                cookie: true,
                xfbml: true,
                version: 'v10.0'
            });
    
            window.FB.AppEvents.logPageView();   
        };
    
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
    }, [appId]);
    
    const handleLogin = () => {
        window.FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                window.FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                // Aquí puedes enviar el token al backend para verificar y crear una sesión
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };

    return (
        <button type="button" id="registro-facebook" className="btn" onClick={handleLogin}>
            <img src={face} alt="Facebook" />
            <p>Registrate con Facebook</p>
        </button>
    );
};

export default FacebookLoginButton;
