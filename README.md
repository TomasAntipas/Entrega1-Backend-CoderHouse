Sistema Backend de Turnos y Reservas

API REST desarrollada con Node.js y Express para la gestión de servicios y reservas.

En esta etapa el proyecto fue refactorizado utilizando una arquitectura en capas con Services, Repositories y DAO, manteniendo los endpoints existentes.

Tecnologías utilizadas
Node.js
Express
JavaScript
ES Modules
dotenv
Persistencia mediante archivos JSON
Arquitectura

El proyecto utiliza el siguiente flujo:

Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
DAO
   ↓
Archivo JSON









Cada capa tiene una responsabilidad específica.

Router

Los routers definen los endpoints de la API y conectan cada ruta con su controller correspondiente.

Controller

Los controllers reciben la información de req, llaman al service correspondiente y construyen la respuesta utilizando res.

Los controllers no acceden directamente a los archivos JSON, DAO ni repositories.

Service

Los services contienen la lógica de negocio de la aplicación.

No conocen req ni res y no acceden directamente a los archivos JSON.

Por ejemplo, en bookings.service.js se encuentra la regla de negocio que determina que, si se agrega dos veces el mismo servicio a una reserva, se debe incrementar su cantidad.

Repository

Los repositories funcionan como una capa intermedia de acceso a datos.

Exponen métodos como:

getAll
getById
create
update
delete

Los repositories no contienen reglas de negocio.

DAO

Los DAO son los responsables de leer y escribir directamente sobre los archivos JSON.

No contienen reglas de negocio.

Esta separación permite que en una etapa posterior se pueda reemplazar la persistencia en archivos JSON por MongoDB sin tener que modificar controllers ni services.

Estructura del proyecto
src/
├── config/
│   └── env.config.js
│
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
│
├── services/
│   ├── services.service.js
│   └── bookings.service.js
│
├── repositories/
│   ├── services.repository.js
│   └── bookings.repository.js
│
├── dao/
│   ├── services.dao.js
│   └── bookings.dao.js
│
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
│
├── data/
│   ├── services.json
│   └── bookings.json
│
├── app.js
└── server.js
Servicios
Obtener todos los servicios
GET /api/services

También permite filtrar por categoría:

GET /api/services?category=Peluquería

Y por disponibilidad:

GET /api/services?available=true
Obtener un servicio
GET /api/services/:sid
Crear un servicio
POST /api/services

Ejemplo:


{
  "name": "Pedicuría",
  "description": "Servicio de pedicuría",
  "duration": 45,
  "price": 9000,
  "category": "Estética",
  "available": true
}
Actualizar un servicio
PUT /api/services/:sid

No se permite modificar el ID del servicio.

Eliminar un servicio
DELETE /api/services/:sid
Reservas
Crear una reserva
POST /api/bookings

Ejemplo:

{
  "clientName": "María Gómez",
  "clientEmail": "maria@email.com",
  "date": "2026-10-01",
  "time": "15:00",
  "status": "confirmed"
}
Obtener una reserva
GET /api/bookings/:bid
Agregar un servicio a una reserva
POST /api/bookings/:bid/services/:sid

Si el servicio no estaba previamente agregado, se incorpora con:

{
  "service": 2,
  "quantity": 1
}



Si el mismo servicio se agrega nuevamente, la cantidad aumenta:

{
  "service": 2,
  "quantity": 2
}

Esta regla de negocio se encuentra en bookings.service.js.

Instalación

Clonar el repositorio:

git clone https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse.git

Ingresar al proyecto:

cd Entrega1-Backend-CoderHouse

Instalar dependencias:

npm install

Crear un archivo .env en la raíz del proyecto:

PORT=8080
NODE_ENV=development

Iniciar el servidor:

npm start

La API estará disponible en:

http://localhost:8080
Endpoints
Services
Método	Endpoint	Descripción
GET	/api/services	Obtener todos los servicios
GET	/api/services/:sid	Obtener servicio por ID
POST	/api/services	Crear servicio
PUT	/api/services/:sid	Actualizar servicio
DELETE	/api/services/:sid	Eliminar servicio
Bookings
Método	Endpoint	Descripción
POST	/api/bookings	Crear reserva
GET	/api/bookings/:bid	Obtener reserva por ID
POST	/api/bookings/:bid/services/:sid	Agregar servicio a una reserva
Objetivo de la refactorización

El objetivo de esta etapa es profesionalizar la estructura del backend separando responsabilidades.

La aplicación mantiene los mismos endpoints y comportamiento externo, pero internamente utiliza una arquitectura preparada para futuras modificaciones.

En la siguiente etapa, esta separación permitirá reemplazar la persistencia mediante archivos JSON por MongoDB Atlas y Mongoose con un impacto reducido sobre el resto de la aplicación.

Repositorio

El proyecto se encuentra disponible en GitHub:

https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse