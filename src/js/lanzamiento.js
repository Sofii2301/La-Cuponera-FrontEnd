// Definir la fecha del lanzamiento
var launchDate = new Date('June 23, 2024 00:00:00').getTime();

// Actualizar el contador cada segundo
var x = setInterval(function() {
    // Obtener la fecha y hora actual
    var now = new Date().getTime();

    // Calcular la distancia entre la fecha actual y la fecha del lanzamiento
    var distance = launchDate - now;

    // Calcular los días, horas, minutos y segundos restantes
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar el contador en el elemento con el id "countdown"
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Si la cuenta regresiva termina, mostrar un mensaje
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "El lanzamiento ha comenzado!";
    }
}, 1000);