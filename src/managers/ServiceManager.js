import services from '../data/services.json' with { type: 'json' };

class ServiceManager {
    constructor() {
        this.services = services;
    }

    getServices() {
        return this.services;
    }

    getServiceById(id) {
        return this.services.find(service => service.id === Number(id)) || null;
    }

    addService(serviceData) {
        const requiredFields = [
            'name',
            'description',
            'duration',
            'price',
            'category',
            'available'
        ];

        const hasAllFields = requiredFields.every(
            field => serviceData[field] !== undefined
        );

        if (!hasAllFields) {
            throw new Error('El servicio debe contener todos los campos requeridos');
        }

        const newId = this.services.length > 0
            ? Math.max(...this.services.map(service => service.id)) + 1
            : 1;

        const newService = {
            ...serviceData,
            id: newId
        };

        this.services.push(newService);

        return newService;
    }

    updateService(id, updatedData) {
        const index = this.services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const updatedService = {
            ...this.services[index],
            ...updatedData,
            id: this.services[index].id
        };

        this.services[index] = updatedService;

        return updatedService;
    }

    deleteService(id) {
        const index = this.services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const deletedService = this.services.splice(index, 1);

        return deletedService[0];
    }
}

export default ServiceManager;