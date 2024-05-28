// src/components/FacebookLoginButton.jsx
import React, { useEffect } from 'react';
import { appId } from '../../config';
import face from "../assets/icon-face.png" 

const FacebookLoginButton = () => {
    useEffect(() => {
        // Inicializar el SDK de Facebook
        window.fbAsyncInit = function() {
            FB.init({
                appId: appId,
                cookie: true,
                xfbml: true,
                version: 'v20.0'
            });
    
            FB.AppEvents.logPageView();   
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
                FB.api('/me', function(response) {
                    document.getElementById("profile").innerHTML = "Good to see you, " + response.name + ". i see your email address is " + response.email
                    console.log('Good to see you, ' + response.name + '.');
                    // Aquí puedes enviar el token al backend para verificar y crear una sesión
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };

    return (
        <button type="button" id="registro-facebook" className="fb-login-button" onClick={handleLogin} data-width="100%" data-size="" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="true">
            <img src={face} alt="Facebook" />
            <p>Registrate con Facebook</p>
        </button>
    );
};

export default FacebookLoginButton;
