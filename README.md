# Administrador de Servicios - Node.js

## Descripción

Este proyecto consiste en una API REST desarrollada con Node.js y Express para gestionar servicios de un sistema de turnos y reservas.

El proyecto utiliza una clase `ServiceManager` para manejar la lógica de los servicios y un router de Express para exponer los endpoints de la API.

Los datos se almacenan actualmente en un archivo JSON que funciona como una base de datos simulada.

La API permite:

- Consultar todos los servicios.
- Buscar un servicio por su ID.
- Filtrar servicios por categoría y disponibilidad.
- Crear nuevos servicios.
- Actualizar servicios existentes.
- Eliminar servicios.
- Validar los datos recibidos.
- Generar automáticamente el ID de nuevos servicios.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ESM (ECMAScript Modules)
- dotenv
- JSON

## Estructura del proyecto

```text
backend-i---cursando/
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── data/
│   │   └── services.json
│   │
│   ├── managers/
│   │   └── ServiceManager.js
│   │
│   ├── routes/
│   │   └── services.router.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
````

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

## Variables de entorno

El proyecto utiliza `dotenv` para cargar las variables de entorno.

Se debe crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env` es de uso local y no debe subirse al repositorio.

También se incluye el archivo `.env.example` como referencia:

```env
PORT=
NODE_ENV=
```

El archivo `src/config/env.config.js` se encarga de cargar y validar que las variables de entorno requeridas estén definidas.

## Ejecución

Para iniciar el servidor:

```bash
node src/server.js
```

El servidor se ejecutará en:

```text
http://localhost:8080
```

## Recurso Services

El recurso principal de la API es `services`.

Cada servicio posee la siguiente estructura:

```js
{
    id,
    name,
    description,
    duration,
    price,
    category,
    available
}
```

Ejemplo:

```json
{
    "id": 1,
    "name": "Corte de cabello",
    "description": "Corte de cabello clásico",
    "duration": 30,
    "price": 8000,
    "category": "Peluquería",
    "available": true
}
```

La lógica de gestión de los servicios se encuentra implementada en la clase `ServiceManager`.

### Métodos de ServiceManager

* `getServices()` → devuelve todos los servicios.
* `getServiceById(id)` → devuelve un servicio por su ID.
* `addService(serviceData)` → agrega un nuevo servicio y genera automáticamente su ID.
* `updateService(id, updatedData)` → actualiza un servicio existente.
* `deleteService(id)` → elimina un servicio existente.

## Endpoints REST

La API utiliza el siguiente prefijo:

```text
/api/services
```

### GET /api/services

Devuelve todos los servicios disponibles.

```text
GET http://localhost:8080/api/services
```

### Filtros mediante query params

El endpoint permite filtrar los servicios mediante `category` y `available`.

Filtrar por categoría:

```text
GET http://localhost:8080/api/services?category=Estética
```

Filtrar por disponibilidad:

```text
GET http://localhost:8080/api/services?available=true
```

También es posible utilizar ambos filtros:

```text
GET http://localhost:8080/api/services?category=Estética&available=true
```

Los filtros se reciben mediante `req.query`.

## GET /api/services/:sid

Devuelve un servicio específico utilizando su ID.

Ejemplo:

```text
GET http://localhost:8080/api/services/2
```

Si el servicio existe, devuelve:

```text
200 OK
```

Si el servicio no existe, devuelve:

```text
404 Not Found
```

```json
{
    "error": "Servicio no encontrado"
}
```

El ID se obtiene mediante `req.params`.

## POST /api/services

Crea un nuevo servicio.

```text
POST http://localhost:8080/api/services
```

El body debe contener los datos del servicio, excepto el ID.

Ejemplo:

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

El ID se genera automáticamente mediante `ServiceManager`.

Respuesta exitosa:

```text
201 Created
```

Ejemplo:

```json
{
    "name": "Limpieza facial",
    "description": "Limpieza facial profunda",
    "duration": 50,
    "price": 12000,
    "category": "Estética",
    "available": true,
    "id": 4
}
```

Si faltan campos obligatorios:

```text
400 Bad Request
```

El body de la petición se obtiene mediante `req.body`.

## PUT /api/services/:sid

Actualiza un servicio existente.

Ejemplo:

```text
PUT http://localhost:8080/api/services/2
```

Se pueden enviar los campos que se desean modificar.

Ejemplo:

```json
{
    "price": 18000
}
```

Respuesta exitosa:

```text
200 OK
```

No se permite modificar el ID del servicio.

Si se intenta modificar el ID:

```text
400 Bad Request
```

Si el servicio no existe:

```text
404 Not Found
```

## DELETE /api/services/:sid

Elimina un servicio existente.

Ejemplo:

```text
DELETE http://localhost:8080/api/services/3
```

Si el servicio existe:

```text
200 OK
```

La respuesta contiene el servicio eliminado.

Si el servicio no existe:

```text
404 Not Found
```

## Códigos de estado HTTP

| Código | Significado                       |
| ------ | --------------------------------- |
| 200    | Operación realizada correctamente |
| 201    | Recurso creado correctamente      |
| 400    | Datos incorrectos o incompletos   |
| 404    | Recurso no encontrado             |

## Arquitectura

El proyecto separa las responsabilidades de la aplicación.

### ServiceManager

Contiene la lógica relacionada con la gestión de los servicios.

Se encarga de:

* Obtener servicios.
* Buscar servicios por ID.
* Crear servicios.
* Generar IDs.
* Actualizar servicios.
* Eliminar servicios.
* Validar los datos necesarios.

### services.router.js

Contiene las rutas REST del recurso `services`.

Se encarga de recibir las peticiones HTTP y comunicarse con `ServiceManager`.

### app.js

Configura Express, habilita el procesamiento de JSON y registra el router de servicios.

### server.js

Inicia el servidor utilizando el puerto definido en las variables de entorno.

### env.config.js

Carga las variables de entorno mediante `dotenv` y valida que las variables requeridas estén definidas.

## Seguridad y archivos excluidos

Los siguientes archivos y carpetas no deben subirse al repositorio:

```text
node_modules/
.env
```

El archivo `.env.example` se incluye para indicar las variables de entorno necesarias sin exponer valores reales.

```
```
