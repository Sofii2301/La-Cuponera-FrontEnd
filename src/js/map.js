document.addEventListener("DOMContentLoaded", function() {
    var defaultLat = 37.09024;
    var defaultLng = -95.712891;

    const map = L.map('map').setView([defaultLat, defaultLng], 4);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 19,
       attribution: ''
    }).addTo(map);

    const marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map)

    const circle = L.circle([defaultLat, defaultLng], {
       color: 'red',
       fillColor: '#f03',
       fillOpacity: 0.5,
       radius: 500
    }).addTo(map).bindPopup('');

    function updateCity(lat, lng) {
       // Utilizar Nominatim para obtener la dirección
       const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

       fetch(nominatimUrl)
          .then(response => response.json())
          .then(data => {
                const ciudad = data.address.city || data.address.town || data.address.village || data.address.hamlet;
                const pais = data.address.country;
                document.getElementById('pais').innerText = pais;


                document.getElementById('ciudad').innerText = ciudad;
          })
          .catch(error => console.error('Error al obtener la dirección:', error));
    }

    // Al mover el marcador
    marker.on('moveend', function (e) {
       const latlng = e.target.getLatLng();
       updateCity(latlng.lat, latlng.lng);
    });

    // Al cargar la página
    updateCity(defaultLat, defaultLng);

    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
          function(position) {
                var latitud = position.coords.latitude;
                var longitud = position.coords.longitude;

                map.setView([latitud, longitud], 13);
                marker.setLatLng([latitud, longitud]);
                circle.setLatLng([latitud, longitud]);

                updateCity(latitud, longitud);
          },
          function(error) {
                switch (error.code) {
                   case error.PERMISSION_DENIED:
                      // El usuario rechazó la geolocalización, se mantiene la ubicación predeterminada
                      break;
                   case error.POSITION_UNAVAILABLE:
                      alert("La información de ubicación no está disponible.");
                      break;
                   case error.TIMEOUT:
                      alert("La solicitud para obtener la ubicación del usuario ha caducado.");
                      break;
                   case error.UNKNOWN_ERROR:
                      alert("Se produjo un error desconocido al intentar obtener la ubicación del usuario.");
                      break;
                }
          }
       );
    } else {
       alert("La geolocalización no es compatible en este navegador.");
    }
});