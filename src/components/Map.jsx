import React from "react";

export default function Map({type}) {
    console.log(type);
    return(
        <>
        <div className={type}>
            <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12451.686771735223!2d-62.27439210000001!3d-38.7196068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbcabdc1302bd%3A0x9c3ae256e9e7effe!2sYPF!5e0!3m2!1ses!2sar!4v1713828389644!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        </>
    )
}