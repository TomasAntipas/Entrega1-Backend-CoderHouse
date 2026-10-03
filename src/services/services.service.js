import ServicesRepository from '../repositories/services.repository.js';

class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {
        let services = await this.repository.getAll();

        const { category, available } = filters;

        if (category) {
            services = services.filter(
                service =>
                    service.category?.toLowerCase() ===
                    category.toLowerCase()
            );
        }

        if (available !== undefined) {
            const availableValue = available === 'true';

            services = services.filter(
                service => service.available === availableValue
            );
        }

        return services;
    }

    async getServiceById(id) {
        return await this.repository.getById(id);
    }

    async createService(serviceData) {
        const requiredFields = ['name', 'duration', 'price'];

        const hasAllFields = requiredFields.every(
            field => serviceData[field] !== undefined
        );

        if (!hasAllFields) {
            throw new Error(
                'El servicio debe contener nombre, duración y precio'
            );
        }

        return await this.repository.create(serviceData);
    }

    async updateService(id, updatedData) {
        return await this.repository.update(id, updatedData);
    }

    async deleteService(id) {
        return await this.repository.delete(id);
    }
}

export default ServicesService;