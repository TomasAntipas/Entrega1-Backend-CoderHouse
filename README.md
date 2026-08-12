# Administrador de Servicios - Node.js

## Descripción

Este proyecto consiste en un administrador de servicios desarrollado con Node.js y JavaScript utilizando módulos ESM.

El objetivo es gestionar los servicios de un sistema de turnos y reservas mediante una clase llamada `ServiceManager`.

El sistema permite:

- Consultar todos los servicios.
- Buscar un servicio por su identificador.
- Agregar nuevos servicios.
- Actualizar servicios existentes.
- Eliminar servicios.
- Validar que los servicios tengan todos los datos requeridos.
- Generar automáticamente el identificador de cada nuevo servicio.

Los datos se almacenan actualmente en un archivo JSON que funciona como una base de datos simulada.

## Tecnologías utilizadas

- Node.js
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
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Instalación

Para instalar las dependencias del proyecto, ejecutar:

```bash
npm install
```

## Variables de entorno

El proyecto utiliza `dotenv` para gestionar las variables de entorno.

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
NODE_ENV=development
```

También se incluye un archivo `.env.example` como plantilla:

```env
PORT=
NODE_ENV=
```

El archivo `.env` no debe ser subido al repositorio.

## Configuración

Las variables de entorno son cargadas y validadas desde:

```text
src/config/env.config.js
```

La aplicación utiliza un patrón Fail-Fast para evitar que el proyecto se ejecute si falta alguna variable de entorno requerida.

## Ejecución

Para ejecutar el proyecto desde la raíz:

```bash
node src/app.js
```

El archivo `app.js` instancia `ServiceManager` y ejecuta diferentes operaciones para comprobar el funcionamiento de sus métodos.

## Recurso Services

El proyecto administra un recurso llamado `services`.

Cada servicio tiene la siguiente estructura:

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

### Propiedades

| Propiedad | Descripción |
|---|---|
| `id` | Identificador único del servicio |
| `name` | Nombre del servicio |
| `description` | Descripción del servicio |
| `duration` | Duración del servicio |
| `price` | Precio del servicio |
| `category` | Categoría a la que pertenece |
| `available` | Indica si el servicio está disponible |

## ServiceManager

La clase `ServiceManager` se encuentra en:

```text
src/managers/ServiceManager.js
```

Esta clase centraliza la lógica necesaria para administrar los servicios.

### getServices()

Devuelve todos los servicios disponibles.

Ejemplo:

```js
manager.getServices();
```

### getServiceById(id)

Busca un servicio utilizando su identificador.

Ejemplo:

```js
manager.getServiceById(2);
```

Si el servicio existe, devuelve el objeto correspondiente. Si no existe, devuelve `null`.

### addService(serviceData)

Agrega un nuevo servicio.

El `id` se genera automáticamente dentro de `ServiceManager`, por lo que no debe enviarse como parte de los datos recibidos.

Ejemplo:

```js
manager.addService({
  name: 'Limpieza facial',
  description: 'Limpieza facial profunda',
  duration: 50,
  price: 12000,
  category: 'Estética',
  available: true
});
```

El método valida que estén presentes los siguientes campos:

- `name`
- `description`
- `duration`
- `price`
- `category`
- `available`

Si falta alguno de estos campos, el servicio es rechazado.

### updateService(id, updatedData)

Actualiza los datos de un servicio existente.

El identificador del servicio no puede ser modificado.

Ejemplo:

```js
manager.updateService(2, {
  price: 18000
});
```

Si el servicio no existe, devuelve `null`.

### deleteService(id)

Elimina un servicio utilizando su identificador.

Ejemplo:

```js
manager.deleteService(3);
```

Si el servicio no existe, devuelve `null`.

## Ejemplo de uso

El archivo `app.js` contiene ejemplos de utilización de los métodos de `ServiceManager`.

Por ejemplo:

```js
const manager = new ServiceManager();

manager.getServices();

manager.getServiceById(2);

manager.addService({
  name: 'Limpieza facial',
  description: 'Limpieza facial profunda',
  duration: 50,
  price: 12000,
  category: 'Estética',
  available: true
});

manager.updateService(2, {
  price: 18000
});

manager.deleteService(3);
```

## Validaciones

El proyecto contempla diferentes casos de error:

- Búsqueda de un servicio inexistente.
- Actualización de un servicio inexistente.
- Eliminación de un servicio inexistente.
- Intento de agregar un servicio incompleto.
- Falta de variables de entorno requeridas.

En los casos correspondientes, el sistema devuelve `null` o genera un error descriptivo.

## Seguridad y buenas prácticas

El proyecto utiliza un archivo `.env` para las variables de entorno.

El archivo `.env` y la carpeta `node_modules` se encuentran incluidos en `.gitignore` para evitar que sean subidos al repositorio.

El archivo `.env.example` se incluye como referencia para indicar las variables necesarias sin exponer información sensible.

## Autor

Tomás

## Estado del proyecto

Proyecto desarrollado como parte de la cursada de Backend I - Coderhouse.