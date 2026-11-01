# Sistema Backend de Turnos y Reservas

Proyecto final de **Backend I – Coderhouse**. Consiste en una API REST para la gestión de servicios y reservas, desarrollada con Node.js, Express y MongoDB.

## Descripción

El sistema permite administrar servicios disponibles y gestionar reservas asociadas a uno o varios servicios. Implementa persistencia en MongoDB Atlas mediante Mongoose y una arquitectura en capas que separa las responsabilidades de cada módulo.

Además, incorpora validaciones de datos, consultas con filtros y paginación, vistas dinámicas con Handlebars y comunicación en tiempo real mediante Socket.io.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución.
- **Express:** framework para el desarrollo de la API REST.
- **MongoDB Atlas:** base de datos en la nube.
- **Mongoose:** modelado y comunicación con MongoDB.
- **Zod:** validación de datos de entrada.
- **Handlebars:** motor de plantillas para las vistas.
- **Socket.io:** comunicación en tiempo real.
- **dotenv:** gestión de variables de entorno.
- **JavaScript (ES Modules):** lenguaje y sistema de módulos.

## Arquitectura del proyecto

El proyecto utiliza una arquitectura en capas para separar la lógica de negocio, el acceso a datos y la interacción con las solicitudes HTTP.

El flujo de comunicación es:

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
Model (Mongoose)
   ↓
MongoDB Atlas
```

**Responsabilidades de cada capa:**

- **Routes:** definen los endpoints de la API.
- **Controllers:** reciben las solicitudes HTTP y gestionan las respuestas.
- **Services:** contienen la lógica de negocio.
- **Repositories:** centralizan las operaciones de acceso a datos.
- **DAO:** interactúan directamente con los modelos y la persistencia.
- **Models:** definen la estructura de los documentos mediante Mongoose.

## Modelos principales

El sistema cuenta con tres modelos:

- **Service:** almacena la información de los servicios disponibles.
- **Booking:** representa las reservas y los servicios asociados a cada una mediante referencias a documentos de MongoDB (`ObjectId`), junto con sus cantidades.
- **Message:** permite almacenar mensajes del sistema.

## Funcionalidades

### Gestión de servicios

- Crear nuevos servicios.
- Consultar servicios.
- Consultar servicios por identificador.
- Actualizar servicios.
- Eliminar servicios.
- Filtrar resultados por categoría y otros criterios disponibles.
- Implementar paginación y ordenamiento.

### Gestión de reservas

- Crear reservas.
- Consultar reservas.
- Asociar servicios existentes a una reserva.
- Gestionar cantidades de servicios asociados.
- Consultar los servicios relacionados mediante `populate` de Mongoose.
- Validar la existencia de reservas y servicios antes de realizar operaciones.

### Validaciones

Se utiliza Zod para validar los datos recibidos en las solicitudes y evitar el procesamiento de información inválida.

### Vistas dinámicas

Se incorpora Handlebars para renderizar vistas desde el servidor.

Vista de servicios:

```text
http://localhost:8080/views/services
```

### Comunicación en tiempo real

Se utiliza Socket.io para comunicar actualizaciones a los clientes conectados, permitiendo reflejar cambios en las vistas sin necesidad de recargar la página.

## Instalación y ejecución

### 1. Cl