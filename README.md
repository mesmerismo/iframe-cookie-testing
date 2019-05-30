# Iframe cookie testing

## Proyectos

- set-cookie
- redirect-iframe
- proxy

Cada proyecto propone diversos escenarios descritos en comentarios en `server.js`.

### set-cookie

Este proyecto carga las páginas que intentan usar las cookies.

Instalar dependencias con `npm install`.

Lanzar servidor con `npm start`.

Añadir entrada al host para que redirija a localhost.

Acceder a `http://mi-dominio:5000/escenario/1`

Acceder a `http://mi-dominio:5000/escenario/2`

Acceder a `http://mi-dominio:5000/escenario/3`

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
