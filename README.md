Sistema Backend de Turnos y Reservas

Descripción

Este proyecto consiste en una API REST para la gestión de servicios y reservas, desarrollada con Node.js y Express. Utiliza MongoDB como base de datos, Mongoose para el modelado y acceso a los datos, Handlebars para renderizar vistas del lado del servidor y Socket.io para implementar funcionalidades en tiempo real.

Tecnologías utilizadas

Node.js

Express

MongoDB Atlas

Mongoose

Handlebars

Socket.io

dotenv

Arquitectura del proyecto

El proyecto está organizado en capas para separar responsabilidades y facilitar el mantenimiento del código.

El flujo de trabajo es:

Routes → Controllers → Services → Repositories → DAO → Models

Routes: definen los endpoints de la aplicación.

Controllers: reciben las solicitudes HTTP y gestionan las respuestas.

Services: contienen la lógica de negocio.

Repositories: centralizan el acceso a los datos desde la capa de servicios.

DAO: implementan las operaciones de acceso a la base de datos.

Models: definen los esquemas y modelos de Mongoose.

Instalación y configuración

Requisitos previos

Node.js y npm instalados.

Una base de datos MongoDB, local o en MongoDB Atlas.

1. Clonar el repositorio

git clone https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse.git

Ingresar a la carpeta del proyecto:

cd Entrega1-Backend-CoderHouse

2. Instalar dependencias

npm install

3. Configurar las variables de entorno

Crear un archivo .env en la raíz del proyecto, tomando como referencia .env.example.

Configurar las variables necesarias:

PORT=8080
NODE_ENV=development
MONGO_URI=tu_uri_de_conexion_a_mongodb

Reemplazar tu_uri_de_conexion_a_mongodb por la URI correspondiente a la base de datos.

Importante: el archivo .env contiene información privada y no debe subirse al repositorio.

4. Iniciar el servidor

npm start

Una vez iniciado, el servidor estará disponible en:

http://localhost:8080

API REST

Servicios



Método

Endpoint

Descripción

GET

/api/services

Obtener los servicios

GET

/api/services/:sid

Obtener un servicio por ID

POST

/api/services

Crear un servicio

PUT

/api/services/:sid

Actualizar un servicio

DELETE

/api/services/:sid

Eliminar un servicio

Reservas

Método

Endpoint

Descripción

POST

/api/bookings

Crear una reserva

GET

/api/bookings/:bid

Obtener una reserva por ID

POST

/api/bookings/:bid/services/:sid

Agregar un servicio a una reserva

Vistas con Handlebars

La aplicación incorpora vistas renderizadas desde el servidor utilizando Handlebars.

Servicios: http://localhost:8080/views/services

Disponibilidad y reservas: http://localhost:8080/views/availability

Las vistas muestran información obtenida de MongoDB mediante la arquitectura en capas existente.

Comunicación en tiempo real con Socket.io

Socket.io permite actualizar las vistas del navegador sin necesidad de recargarlas cuando se producen cambios relevantes en el sistema.

Se implementan eventos para notificar modificaciones relacionadas con los servicios y las reservas.

El cliente escucha los eventos desde src/public/js/socket.js y actualiza la información mostrada en las vistas.

Estructura principal

src/
├── controllers/
│   ├── bookings.controller.js
│   ├── services.controller.js
│   └── views.controller.js
├── dao/
├── models/
├── repositories/
├── routes/
│   ├── bookings.router.js
│   ├── services.router.js
│   └── views.router.js
├── services/
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── socket.js
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── services.handlebars
│   └── availability.handlebars
├── app.js
└── server.js

Consideraciones

La API REST existente se mantiene junto con las nuevas vistas.

Las vistas utilizan las mismas capas de acceso a datos que la API.

La conexión a MongoDB se configura mediante variables de entorno.

Los archivos .env y node_modules no deben incluirse en el repositorio público.