import ServicesRepository from '../repositories/services.repository.js';

class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices() {
        return await this.repository.getAll();
    }

    async getServiceById(id) {
        return await this.repository.getById(id);
    }

    async createService(serviceData) {
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
            throw new Error(
                'El servicio debe contener todos los campos requeridos'
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