import ServicesRepository from '../repositories/services.repository.js';

class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {
        return this.repository.getAll(filters);
    }

    async getServiceById(id) {
        return this.repository.getById(id);
    }

    async createService(serviceData) {
        return this.repository.create(serviceData);
    }

    async updateService(id, updatedData) {
        return this.repository.update(id, updatedData);
    }

    async deleteService(id) {
        return this.repository.delete(id);
    }
}

export default ServicesService;