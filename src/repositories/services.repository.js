import ServicesDAO from '../dao/services.dao.js';

class ServicesRepository {
    constructor() {
        this.dao = new ServicesDAO();
    }

    async getAll(options) {
        return this.dao.getAll(options);
    }

    async getById(id) {
        return this.dao.getById(id);
    }

    async create(serviceData) {
        return this.dao.create(serviceData);
    }

    async update(id, updatedData) {
        return this.dao.update(id, updatedData);
    }

    async delete(id) {
        return this.dao.delete(id);
    }
}

export default ServicesRepository;