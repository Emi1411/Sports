/*if('serviceWorker' in navigator){
    console.log('Service Worker Soportado :-)');
}*/

// --- MUESTRA SI EL NAVEGADOR SOPORTA EL SERVICE WORKER --- 

if(navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js')
    .then(function(registration){
        console.log('Service Worker registrado correctamente', registration.scope);
        notifyMe();
    })
    .catch (error => console.log('Falla en el registro del Service Worker', error));
}

  function notifyMe() {
    // Comprobamos si el navegador soporta las notificaciones
    if (!("Notification" in window)) {
      alert("Este navegador no soporta las notificaciones del sistema");
    }
  
    // Comprobamos si ya nos habían dado permiso
    else if (Notification.permission === "granted") {
      spawnNotification('Gracias por volver a nuestra página' ,'img/sportsicon.png' ,'Bienvenido a Sports');
    }
  
    // Si no, tendremos que pedir permiso al usuario
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // Si el usuario acepta, lanzamos la notificación
        if (permission === "granted") {
          spawnNotification('Disfruta del poder de los deportes', 'img/sportsicon.png', 'Bienvenido a Sports');
        }
      });
    }
    }

    function spawnNotification(theBody, theIcon, theTitle) {
        var options = {
          body: theBody,
          icon: theIcon
        }
        var n = new Notification(theTitle, options);
    }

    