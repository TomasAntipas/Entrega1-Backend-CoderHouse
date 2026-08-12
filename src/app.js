import './config/env.config.js';
import ServiceManager from './managers/ServiceManager.js';

const manager = new ServiceManager();

console.log('--- SERVICIOS INICIALES ---');
console.log(manager.getServices());

console.log('--- BUSCAR SERVICIO ---');
console.log(manager.getServiceById(2));

console.log('--- AGREGAR SERVICIO ---');
const newService = manager.addService({
    name: 'Limpieza facial',
    description: 'Limpieza facial profunda',
    duration: 50,
    price: 12000,
    category: 'Estética',
    available: true
    });
console.log(newService);

console.log('--- ACTUALIZAR SERVICIO ---');
const updatedService = manager.updateService(2, {
    price: 18000
    });
    console.log(updatedService);

console.log('--- ELIMINAR SERVICIO ---');
const deletedService = manager.deleteService(3);
console.log(deletedService);

console.log('--- SERVICIOS FINALES ---');
console.log(manager.getServices());
