# API de Turnos y Reservas

## Descripción del proyecto

Este proyecto consiste en una API REST para la gestión de servicios y reservas, desarrollada con Node.js y Express.

La aplicación utiliza MongoDB Atlas como base de datos y Mongoose para la gestión de los documentos y sus relaciones.

El proyecto implementa una arquitectura en capas para separar las responsabilidades de cada componente, facilitar el mantenimiento y organizar la lógica de negocio y el acceso a los datos.

Además, incorpora consultas avanzadas, paginación, validaciones con Zod, vistas con Handlebars y comunicación en tiempo real mediante Socket.io.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Dotenv
- Zod
- Handlebars
- Express Handlebars
- Socket.io
- JavaScript con módulos ES6

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js instalado.
- npm instalado.
- Una cuenta de MongoDB Atlas con una base de datos configurada.
- Una URI de conexión válida a MongoDB Atlas.

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

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia el archivo `.env.example`.

El archivo `.env` debe contener las siguientes variables:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=TU_URI_DE_CONEXION_A_MONGODB_ATLAS
```

Reemplazar `TU_URI_DE_CONEXION_A_MONGODB_ATLAS` por la URI de conexión correspondiente a la base de datos de MongoDB Atlas.

**Importante:** el archivo `.env` contiene información de configuración privada y no debe subirse al repositorio. El archivo `.env.example` se incluye como referencia para configurar el proyecto.

## Ejecución del proyecto

Para iniciar el servidor, ejecutar:

```bash
npm start
```

Si la configuración es correcta, se establecerá la conexión con MongoDB Atlas y el servidor quedará disponible en:

```text
http://localhost:8080
```

El puerto puede modificarse mediante la variable de entorno `PORT`.

## Arquitectura del proyecto

El proyecto utiliza una arquitectura en capas que permite separar las responsabilidades y facilitar el mantenimiento del código.

El flujo de las solicitudes es:

```text
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
Model
   ↓
MongoDB Atlas
```

### Responsabilidades de cada capa

**Routes**

Definen los endpoints de la API y conectan las solicitudes HTTP con los controladores y los middlewares correspondientes.

**Controllers**

Reciben las solicitudes, utilizan los servicios y devuelven las respuestas HTTP.

**Services**

Contienen la lógica de negocio de la aplicación.

**Repositories**

Actúan como intermediarios entre los servicios y los DAO, organizando las operaciones de acceso a los datos.

**DAO (Data Access Object)**

Se encargan de realizar las operaciones de acceso a los datos mediante Mongoose.

**Models**

Definen la estructura de los documentos y las relaciones entre ellos utilizando esquemas de Mongoose.

**MongoDB Atlas**

Es la base de datos utilizada para almacenar los servicios, las reservas y los mensajes.

## Modelos de datos

La aplicación utiliza tres modelos principales.

### Service

Representa los servicios disponibles.

Entre sus campos se encuentran:

- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración del servicio.
- `price`: precio del servicio.
- `category`: categoría del servicio.
- `available`: disponibilidad del servicio.

### Booking

Representa una reserva.

Contiene información del cliente, la fecha, el horario, el estado de la reserva y los servicios asociados.

Los servicios se almacenan mediante referencias a documentos de la colección de servicios, utilizando un identificador y una cantidad:

```javascript
services: [
  {
    service: ObjectId,
    quantity: Number
  }
]
```

Esto permite relacionar una reserva con los servicios registrados en la base de datos sin duplicar toda la información de cada servicio.

Al consultar una reserva, se utiliza `populate()` para obtener los datos de los servicios asociados.

### Message

Representa los mensajes utilizados por la aplicación.

## Endpoints de servicios

La API permite realizar operaciones CRUD sobre los servicios.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener servicios con filtros y paginación |
| GET | `/api/services/:sid` | Obtener un servicio por su ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

### Consultas avanzadas

El endpoint `GET /api/services` permite filtrar, ordenar y paginar los resultados mediante parámetros de consulta.

Los parámetros disponibles son:

| Parámetro | Descripción |
|---|---|
| `category` | Filtra por categoría |
| `available` | Filtra por disponibilidad (`true` o `false`) |
| `page` | Número de página |
| `limit` | Cantidad de resultados por página |
| `sortBy` | Campo por el que se ordenan los resultados |
| `order` | Sentido del ordenamiento: `asc` o `desc` |

Los parámetros pueden combinarse en una misma consulta.

#### Ejemplos de consultas

Obtener todos los servicios:

```http
GET /api/services
```

Filtrar por categoría:

```http
GET /api/services?category=Belleza
```

Filtrar servicios disponibles:

```http
GET /api/services?available=true
```

Obtener la segunda página con cinco resultados:

```http
GET /api/services?page=2&limit=5
```

Ordenar por precio de menor a mayor:

```http
GET /api/services?sortBy=price&order=asc
```

Combinar filtros, paginación y ordenamiento:

```http
GET /api/services?category=Belleza&available=true&page=1&limit=5&sortBy=price&order=asc
```

### Respuesta paginada

La consulta devuelve los resultados junto con los metadatos de paginación.

La estructura de la respuesta es:

```json
{
  "results": [],
  "totalResults": 0,
  "currentPage": 1,
  "limit": 10,
  "totalPages": 0,
  "hasPrevPage": false,
  "hasNextPage": false
}
```

Los campos representan:

- `results`: servicios correspondientes a la consulta.
- `totalResults`: cantidad total de servicios que coinciden con los filtros.
- `currentPage`: página actual.
- `limit`: cantidad máxima de resultados por página.
- `totalPages`: cantidad total de páginas.
- `hasPrevPage`: indica si existe una página anterior.
- `hasNextPage`: indica si existe una página siguiente.

Si se envían parámetros de consulta inválidos, la API devuelve una respuesta HTTP `400 Bad Request` con información sobre los errores de validación.

## Endpoints de reservas

La API permite crear reservas, consultar una reserva y agregar servicios a una reserva existente.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Obtener una reserva por su ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |

### Crear una reserva

Endpoint:

```http
POST /api/bookings
```

Ejemplo del cuerpo de la solicitud:

```json
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan@email.com",
  "date": "2026-11-20",
  "time": "10:00",
  "services": [
    {
      "service": "ID_DEL_SERVICIO",
      "quantity": 1
    }
  ]
}
```

Reemplazar `ID_DEL_SERVICIO` por el identificador de un servicio existente en la base de datos.

Los campos enviados deben cumplir con las validaciones y el esquema definidos para el modelo de reservas.

### Consultar una reserva

Endpoint:

```http
GET /api/bookings/:bid
```

La consulta utiliza `populate()` para obtener la información de los servicios asociados a la reserva.

De esta manera, en lugar de recibir únicamente los identificadores de los servicios, la respuesta puede incluir sus datos, como nombre, descripción, precio, duración y categoría.

### Agregar un servicio a una reserva

Endpoint:

```http
POST /api/bookings/:bid/services/:sid
```

Permite asociar un servicio existente a una reserva.

Ejemplo del cuerpo de la solicitud:

```json
{
  "quantity": 2
}
```

Los identificadores de la reserva y del servicio deben corresponder a documentos válidos.

La cantidad debe cumplir con las reglas de validación establecidas.

## Validaciones con Zod

El proyecto utiliza Zod para validar los datos recibidos en las solicitudes antes de ejecutar las operaciones correspondientes.

Las validaciones se aplican a los cuerpos de las solicitudes, los parámetros de las rutas y los parámetros de consulta, según el endpoint.

Se validan, entre otros aspectos:

- Los campos requeridos.
- Los tipos de datos.
- Los valores numéricos y sus restricciones.
- El formato de los correos electrónicos.
- Los parámetros de paginación.
- Los campos permitidos para ordenar los resultados.
- Los identificadores recibidos.
- La estructura de los servicios asociados a una reserva.
- Las cantidades de servicios agregadas a una reserva.

Cuando una solicitud no cumple con las reglas de validación, la API responde con el estado HTTP `400 Bad Request` y un mensaje que permite identificar el error.

Por ejemplo, al intentar crear un servicio sin los campos obligatorios, se informa cuáles son los datos faltantes.

Estas validaciones evitan que solicitudes con datos incorrectos continúen hacia las capas de negocio y persistencia.

## Vistas con Handlebars

El proyecto incluye vistas desarrolladas con Handlebars para mostrar información de los servicios y las reservas.

Las vistas permiten consultar los datos de la aplicación desde una interfaz web.

Rutas de las vistas:

| Ruta | Descripción |
|---|---|
| `/views/services` | Visualización de servicios |
| `/views/availability` | Visualización de servicios y reservas |

Las vistas obtienen la información mediante las capas de servicios de la aplicación.

## Comunicación en tiempo real con Socket.io

Socket.io permite comunicar el servidor con los clientes conectados y actualizar la información en tiempo real.

Cuando se producen determinadas operaciones sobre los servicios o las reservas, el servidor puede emitir eventos para notificar los cambios a los clientes conectados.

Esto permite actualizar la información mostrada en las vistas sin depender exclusivamente de una recarga manual de la página.

## Manejo de errores

La aplicación contempla el manejo de errores relacionados con las solicitudes, la validación de datos y las operaciones sobre la base de datos.

Entre los casos contemplados se encuentran:

- Datos de entrada inválidos.
- Parámetros de consulta incorrectos.
- Identificadores con formato incorrecto.
- Servicios o reservas inexistentes.
- Errores durante las operaciones con MongoDB.
- Errores internos del servidor.

Las respuestas HTTP permiten identificar los errores de validación y los recursos que no se encuentran disponibles.

## Pruebas de la API

Los endpoints pueden probarse utilizando herramientas como Postman, Insomnia o cURL.

### Obtener servicios

```bash
curl http://localhost:8080/api/services
```

### Filtrar servicios por categoría

```bash
curl "http://localhost:8080/api/services?category=Belleza"
```

### Filtrar y ordenar servicios

```bash
curl "http://localhost:8080/api/services?available=true&page=1&limit=5&sortBy=price&order=asc"
```

### Consultar una reserva

```bash
curl http://localhost:8080/api/bookings/ID_DE_LA_RESERVA
```

Para las solicitudes `POST` y `PUT`, se deben enviar los datos en formato JSON y configurar el encabezado:

```http
Content-Type: application/json
```

Los identificadores utilizados en las pruebas deben corresponder a documentos existentes en la base de datos cuando el endpoint requiera referencias válidas.

## Seguridad y buenas prácticas

- Las credenciales de MongoDB Atlas se configuran mediante variables de entorno.
- El archivo `.env` no debe subirse al repositorio.
- La carpeta `node_modules/` no debe incluirse en Git.
- El archivo `.env.example` debe contener únicamente valores de ejemplo, sin credenciales reales.
- La lógica de negocio se mantiene separada del acceso a datos.
- Las entradas se validan antes de procesarlas.
- Las relaciones entre reservas y servicios se representan mediante referencias de MongoDB.
- El archivo `package-lock.json` permite conservar las versiones de las dependencias instaladas.

## Autor

Tomás Antipas

## Repositorio

[Entrega1-Backend-CoderHouse](https://github.com/TomasAntipas/Entrega1-Backend-CoderHouse)