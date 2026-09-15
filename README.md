# Sistema Backend de Turnos y Reservas

## Descripción

API REST desarrollada con Node.js, Express y JavaScript utilizando módulos ESM.

El proyecto permite gestionar servicios y reservas de turnos mediante distintos endpoints. La información se almacena en archivos JSON utilizando el módulo `FileSystem` de Node.js.

La API está organizada separando las responsabilidades entre:

- Routers.
- Controllers.
- Managers.
- Archivos JSON.

El objetivo de esta organización es mantener un código más claro, ordenado y fácil de mantener.

---

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ESM
- dotenv
- FileSystem
- JSON

---

## Estructura del proyecto

```text
Backend I - Cursando/
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── controllers/
│   │   ├── services.controller.js
│   │   └── bookings.controller.js
│   │
│   ├── managers/
│   │   ├── ServiceManager.js
│   │   └── BookingManager.js
│   │
│   ├── routes/
│   │   ├── services.router.js
│   │   └── bookings.router.js
│   │
│   ├── data/
│   │   ├── services.json
│   │   └── bookings.json
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse.git
```

Ingresar a la carpeta del proyecto:

```bash
cd Entrega1-Backend-CoderHouse
```

Instalar las dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo llamado `.env` en la raíz del proyecto.

El archivo debe contener:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env` no debe subirse al repositorio porque puede contener información privada.

El proyecto incluye un archivo `.env.example` como referencia.

---

## Ejecución

Para iniciar el servidor, ejecutar:

```bash
npm start
```

El servidor se iniciará en:

```text
http://localhost:8080
```

---

# Organización de la API

La API está organizada en diferentes capas:

```text
Cliente
   ↓
server.js
   ↓
app.js
   ↓
Router
   ↓
Controller
   ↓
Manager
   ↓
Archivo JSON
```

## Routers

Los routers se encargan únicamente de definir las rutas de la API y conectarlas con sus respectivos controllers.

No contienen lógica de negocio ni acceden directamente a los archivos JSON.

Archivos:

```text
src/routes/services.router.js
src/routes/bookings.router.js
```

## Controllers

Los controllers reciben las solicitudes HTTP, leen la información enviada por el cliente y llaman a los managers correspondientes.

Se encargan de utilizar:

- `req.params`
- `req.query`
- `req.body`

También construyen las respuestas HTTP utilizando:

```js
res.status().json()
```

Archivos:

```text
src/controllers/services.controller.js
src/controllers/bookings.controller.js
```

## Managers

Los managers contienen la lógica de datos y se encargan de trabajar con los archivos JSON mediante `FileSystem`.

Los managers no utilizan `req` ni `res`.

Archivos:

```text
src/managers/ServiceManager.js
src/managers/BookingManager.js
```

---

# Endpoints de Services

## GET `/api/services`

Obtiene todos los servicios.

```http
GET http://localhost:8080/api/services
```

También permite filtrar por categoría:

```http
GET http://localhost:8080/api/services?category=Estética
```

Y por disponibilidad:

```http
GET http://localhost:8080/api/services?available=true
```

---

## GET `/api/services/:sid`

Obtiene un servicio específico mediante su ID.

```http
GET http://localhost:8080/api/services/2
```

Si el servicio no existe, devuelve un error `404`.

---

## POST `/api/services`

Crea un nuevo servicio.

```http
POST http://localhost:8080/api/services
```

Ejemplo de body:

```json
{
  "name": "Limpieza facial",
  "description": "Limpieza facial profunda",
  "duration": 50,
  "price": 12000,
  "category": "Estética",
  "available": true
}
```

El ID se genera automáticamente. No se debe enviar el campo `id` en el body.

---

## PUT `/api/services/:sid`

Actualiza un servicio existente.

```http
PUT http://localhost:8080/api/services/2
```

Ejemplo de body:

```json
{
  "price": 18000
}
```

No se permite modificar el ID del servicio.

---

## DELETE `/api/services/:sid`

Elimina un servicio existente.

```http
DELETE http://localhost:8080/api/services/3
```

---

# Endpoints de Bookings

## POST `/api/bookings`

Crea una nueva reserva.

```http
POST http://localhost:8080/api/bookings
```

Ejemplo de body:

```json
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan@email.com",
  "date": "2026-09-10",
  "time": "10:00",
  "status": "confirmed",
  "services": []
}
```

El ID de la reserva se genera automáticamente.

---

## GET `/api/bookings/:bid`

Obtiene una reserva mediante su ID.

```http
GET http://localhost:8080/api/bookings/1
```

Si la reserva no existe, devuelve un error `404`.

---

## POST `/api/bookings/:bid/services/:sid`

Agrega un servicio existente a una reserva existente.

```http
POST http://localhost:8080/api/bookings/1/services/2
```

La API valida que:

- La reserva exista.
- El servicio exista.

Los servicios se almacenan dentro de la reserva con la siguiente estructura:

```json
{
  "service": 2,
  "quantity": 1
}
```

Si se agrega nuevamente el mismo servicio, se incrementa la cantidad.

---

# Persistencia

Los datos se almacenan en los siguientes archivos:

```text
src/data/services.json
src/data/bookings.json
```

Las operaciones de creación, modificación y eliminación actualizan los archivos JSON.

Por este motivo, los datos permanecen guardados aunque el servidor se reinicie.

---

# Métodos principales de los Managers

## ServiceManager

El `ServiceManager` trabaja con `services.json` y contiene los siguientes métodos:

- `getServices()`
- `getServiceById()`
- `addService()`
- `updateService()`
- `deleteService()`

## BookingManager

El `BookingManager` trabaja con `bookings.json` y contiene los siguientes métodos:

- `createBooking()`
- `getBookings()`
- `getBookingById()`
- `addServiceToBooking()`
- `saveBookings()`

---

# Códigos HTTP utilizados

- `200`: operación exitosa.
- `201`: recurso creado correctamente.
- `400`: datos incorrectos o incompletos.
- `404`: recurso no encontrado.
- `500`: error interno del servidor.

---

# Archivos excluidos

Por seguridad y para evitar subir archivos innecesarios, no deben incluirse en el repositorio:

```text
node_modules/
.env
```

El archivo `.env.example` sí se incluye para indicar qué variables de entorno necesita el proyecto.