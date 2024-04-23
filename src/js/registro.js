document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el formulario por su ID
    const form = document.getElementById("registration-form");

    // Escucha el evento submit del formulario
    form.addEventListener("submit", function(event) {
        // Valida el formulario
        if (!form.checkValidity()) {
            // Si el formulario no es válido, previene el envío
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Agrega la clase "was-validated" al formulario para mostrar los mensajes de validación
        form.classList.add("was-validated");
    });
});