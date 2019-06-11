# Iframe cookie testing

## Proyectos

- set-cookie
- redirect-iframe
- proxy
- google-maps

Cada proyecto propone diversos escenarios descritos en comentarios en `server.js`.

### set-cookie

Este proyecto carga las páginas que intentan usar las cookies.

Instalar dependencias con `npm install`.

Lanzar servidor con `npm start`.

Añadir entrada al host para que redirija a localhost.
El proyecto está preparado para funcionar con `herma.test`.

Acceder a `http://herma.test:5000/escenario/1`

Acceder a `http://herma.test:5000/escenario/2`

Acceder a `http://herma.test:5000/escenario/3`

### redirect-iframe

Este proyecto carga en un iframe la web de `set-cookie`.

Instalar dependencias con `npm install`.

Lanzar servidor con `npm start`.

Acceder a `http://localhost:5001/escenario/1`

Acceder a `http://localhost:5001/escenario/2`

Acceder a `http://localhost:5001/escenario/3`

### proxy

Este proyecto hace de intermediario para hacer peticiones ente la web con iframe y el servidor.

Instalar dependencias con `npm install`.

Lanzar servidor con `npm start`.

Acceder a `http://localhost:5002/escenario/3`

Acceder a `http://localhost:5002/escenario/4`

### google-map

Una web sencilla que carga Google Maps en un iframe para poder comparar el comportamiento con el resto de ejemplos.

### window-error

Proyecto para poder probar la emisión de eventos desde un iframe a la ventana superior.

Instalar dependencias con `npm install`.

Lanzar servidor con `npm start`.

Acceder a `http://herma.test:5000`

Hacer click en el enlace "Another page" para lanzar el evento.

Verifica que el dato del evento coincide con el mostrado en el iframe.
