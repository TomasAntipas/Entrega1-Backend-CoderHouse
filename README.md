Sistema Backend de Turnos y Reservas

API REST desarrollada con Node.js y Express para la gestión de servicios y reservas.

En esta etapa, el proyecto fue migrado de persistencia mediante archivos JSON a MongoDB Atlas utilizando Mongoose, manteniendo los endpoints existentes y la arquitectura en capas.

Tecnologías utilizadas

Node.js

Express

JavaScript

ES Modules

dotenv

MongoDB Atlas

Mongoose

Arquitectura

El proyecto utiliza una arquitectura en capas con el siguiente flujo:

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
MongoDB Atlas

Cada capa tiene una responsabilidad específica, lo que permite separar la lógica de negocio de la gestión de las solicitudes HTTP y del acceso a los datos.

Router

Los routers definen los endpoints de la API y conectan cada ruta con su controller correspondiente.

Controller

Los controllers reciben la información de las solicitudes HTTP, llaman al service correspondiente y construyen la respuesta utilizando res.

No acceden directamente a los DAO ni a la base de datos.

Service

Los services contienen la lógica de negocio de la aplicación.

No conocen req ni res y no acceden directamente a la base de datos.

En services.service.js se encuentra la lógica de filtrado de servicios por categoría y disponibilidad.

En bookings.service.js se encuentra la regla de negocio que determina que, si se agrega nuevamente el mismo servicio a una reserva, se debe incrementar su cantidad en lugar de duplicarlo.

Repository

Los repositories funcionan como una capa intermedia entre los services y los DAO.

Exponen métodos de acceso a datos, como:

getAll

getById

create

update

delete

Los repositories no contienen reglas de negocio.

DAO

Los DAO son responsables de interactuar con MongoDB mediante los modelos de Mongoose.

Encapsulan las operaciones de consulta, creación, actualización y eliminación de documentos.

Esta separación permite mantener desacoplada la lógica de negocio del mecanismo de persistencia.

Models

Los modelos definen la estructura de los documentos almacenados en MongoDB, junto con sus tipos de datos, validaciones y valores predeterminados.

El proyecto cuenta con los siguientes modelos:

service.model.js: define la estructura de los servicios.

booking.model.js: define la estructura de las reservas y las referencias a los servicios asociados.

message.model.js: define la estructura de los mensajes.

En las reservas, los servicios se representan mediante referencias a documentos de MongoDB utilizando ObjectId, junto con la cantidad correspondiente.

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
├── models/
│   ├── service.model.js
│   ├── booking.model.js
│   └── message.model.js
│
├── routes/
│   ├── services.router.js
│   └── bookings.router.js

├── app.js
└── server.js

Servicios

Obtener todos los servicios

GET /api/services

Permite obtener los servicios registrados y aplicar filtros opcionales.

Filtrar por categoría:

GET /api/services?category=Peluquería

Filtrar por disponibilidad:

GET /api/services?available=true

Los filtros se procesan en la capa de services.

Obtener un servicio por ID

GET /api/services/:sid

Permite obtener un servicio mediante su identificador de MongoDB.

Crear un servicio

POST /api/services

Ejemplo de cuerpo de la solicitud:

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

Permite actualizar los datos de un servicio existente mediante su identificador.

No se permite modificar el ID del servicio.

Eliminar un servicio

DELETE /api/services/:sid

Permite eliminar un servicio mediante su identificador.

Reservas

Crear una reserva

POST /api/bookings

Ejemplo de cuerpo de la solicitud:

{
  "clientName": "María Gómez",
  "clientEmail": "maria@email.com",
  "date": "2026-10-10",
  "time": "15:00",
  "status": "confirmed"
}

El estado es opcional y, si no se especifica, se utiliza el valor predeterminado pending.

Obtener una reserva

GET /api/bookings/:bid

Permite obtener una reserva mediante su identificador de MongoDB.

Agregar un servicio a una reserva

POST /api/bookings/:bid/services/:sid

Permite asociar un servicio existente a una reserva utilizando los identificadores de ambos documentos.

Si el servicio no estaba previamente agregado, se incorpora con cantidad 1.

Ejemplo de la estructura del servicio asociado:

{
  "service": "IDENTIFICADOR_DEL_SERVICIO",
  "quantity": 1
}



Si el mismo servicio se agrega nuevamente, la cantidad aumenta:

{
  "service": "IDENTIFICADOR_DEL_SERVICIO",
  "quantity": 2
}

El campo service contiene el ObjectId del documento correspondiente en MongoDB.

Esta regla de negocio se encuentra en bookings.service.js.

Endpoints disponibles

Services

Método

Endpoint

Descripción

GET

/api/services

Obtener todos los servicios

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

Bookings

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

Instalación y ejecución

Requisitos previos

Node.js y npm instalados.

Una instancia de MongoDB Atlas configurada.

Un usuario de base de datos con permisos de acceso.

La dirección IP habilitada en la configuración de acceso de MongoDB Atlas, según corresponda.

1. Clonar el repositorio

git clone https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse.git

Ingresar al directorio del proyecto:

cd Entrega1-Backend-CoderHouse

2. Instalar las dependencias

npm install

3. Configurar las variables de entorno

Crear un archivo .env en la raíz del proyecto tomando como referencia .env.example.

Configurar las siguientes variables:

PORT=8080
NODE_ENV=development
MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER/BASE_DE_DATOS

Reemplazar los valores de ejemplo por los datos reales de conexión a MongoDB Atlas.

La variable MONGO_URI contiene la cadena de conexión a la base de datos.

Importante: el archivo .env contiene credenciales y no debe publicarse en GitHub. Para compartir el proyecto se incluye .env.example, sin credenciales reales.

4. Iniciar el servidor

npm start

Si la conexión con MongoDB se establece correctamente, el servidor quedará disponible en:

http://localhost:8080

Objetivo de la migración

El objetivo de esta etapa es reemplazar la persistencia en archivos JSON por MongoDB Atlas y Mongoose, manteniendo la arquitectura en capas y los endpoints existentes.

La incorporación de models, DAO y repositories permite separar las responsabilidades y facilitar el mantenimiento y la evolución del sistema.

La lógica de negocio permanece en la capa de services, mientras que los DAO encapsulan las operaciones de persistencia.

Repositorio

El proyecto se encuentra disponible en GitHub:

https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse