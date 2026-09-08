# Sistema Backend de Turnos y Reservas

## Descripción

API REST desarrollada con Node.js, Express y FileSystem para gestionar servicios y reservas de turnos.

La información se persiste en archivos JSON, por lo que los datos se mantienen aunque el servidor se reinicie.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ESM
- dotenv
- FileSystem
- JSON

## Estructura del proyecto

    src/
    ├── config/
    │   └── env.config.js
    ├── data/
    │   ├── services.json
    │   └── bookings.json
    ├── managers/
    │   ├── ServiceManager.js
    │   └── BookingManager.js
    ├── routes/
    │   ├── services.router.js
    │   └── bookings.router.js
    ├── app.js
    └── server.js

    .env.example
    .gitignore
    package-lock.json
    package.json
    README.md

## Instalación

Clonar el repositorio:

    git clone https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse.git

Ingresar al proyecto:

    cd Entrega1-Backend-CoderHouse

Instalar las dependencias:

    npm install

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

    PORT=8080
    NODE_ENV=development

El archivo `.env` no debe subirse al repositorio.

Se incluye `.env.example` como referencia.

## Ejecución

Para iniciar el servidor:

    npm start

El servidor se ejecutará en:

    http://localhost:8080

## Recurso Services

Cada servicio posee los siguientes campos:

- id
- name
- description
- duration
- price
- category
- available

### GET /api/services

Devuelve todos los servicios.

    GET http://localhost:8080/api/services

También permite utilizar filtros mediante query params:

    GET http://localhost:8080/api/services?category=Estética

    GET http://localhost:8080/api/services?available=true

### GET /api/services/:sid

Devuelve un servicio específico mediante su ID.

    GET http://localhost:8080/api/services/2

### POST /api/services

Crea un nuevo servicio.

El ID se genera automáticamente y no debe enviarse desde el body.

    POST http://localhost:8080/api/services

Ejemplo de body:

    {
        "name": "Limpieza facial",
        "description": "Limpieza facial profunda",
        "duration": 50,
        "price": 12000,
        "category": "Estética",
        "available": true
    }

### PUT /api/services/:sid

Actualiza un servicio existente.

    PUT http://localhost:8080/api/services/2

Ejemplo de body:

    {
        "price": 18000
    }

No se permite modificar el ID.

### DELETE /api/services/:sid

Elimina un servicio existente.

    DELETE http://localhost:8080/api/services/3

## Recurso Bookings

Cada reserva posee:

- id
- clientName
- clientEmail
- date
- time
- status
- services

El ID se genera automáticamente.

Los servicios dentro de una reserva se almacenan de la siguiente manera:

    {
        "service": 2,
        "quantity": 1
    }

Si se agrega nuevamente el mismo servicio, se incrementa la cantidad.

### POST /api/bookings

Crea una nueva reserva.

La reserva puede comenzar con el array `services` vacío.

    POST http://localhost:8080/api/bookings

Ejemplo de body:

    {
        "clientName": "Juan Pérez",
        "clientEmail": "juan@email.com",
        "date": "2026-09-10",
        "time": "10:00",
        "status": "confirmed",
        "services": []
    }

### GET /api/bookings/:bid

Devuelve una reserva mediante su ID.

    GET http://localhost:8080/api/bookings/1

### POST /api/bookings/:bid/services/:sid

Agrega un servicio existente a una reserva existente.

    POST http://localhost:8080/api/bookings/1/services/2

La API valida que tanto la reserva como el servicio existan.

Si el servicio ya fue agregado, se incrementa `quantity`.

## Persistencia

Los datos se almacenan mediante FileSystem en:

    src/data/services.json
    src/data/bookings.json

Las operaciones de creación, modificación y eliminación actualizan los archivos JSON.

De esta manera, los datos no se pierden al reiniciar el servidor.

## Managers

### ServiceManager

Gestiona `services.json` mediante los siguientes métodos:

- getServices()
- getServiceById()
- addService()
- updateService()
- deleteService()

### BookingManager

Gestiona `bookings.json` mediante:

- createBooking()
- getBookingById()
- addServiceToBooking()

## Códigos HTTP utilizados

- 200 - Operación exitosa
- 201 - Recurso creado
- 400 - Datos incorrectos o incompletos
- 404 - Recurso no encontrado
- 500 - Error interno

## Arquitectura

El proyecto separa las responsabilidades de la siguiente manera:

    Cliente
       ↓
    server.js
       ↓
    app.js
       ↓
    Router
       ↓
    Manager
       ↓
    Archivo JSON

`server.js` inicia el servidor.

`app.js` configura Express y registra los routers.

Los routers reciben las peticiones HTTP.

Los managers contienen la lógica de cada recurso y gestionan la persistencia mediante FileSystem.

## Archivos excluidos

Por seguridad, no se incluyen en el repositorio:

    node_modules/
    .env

El archivo `.env.example` se incluye como referencia para configurar las variables de entorno.