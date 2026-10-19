import BookingsDAO from '../dao/bookings.dao.js';

class BookingsRepository {
    constructor() {
        this.dao = new BookingsDAO();
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(bookingData) {
        return await this.dao.create(bookingData);
    }
    

    async update(id, updatedData) {
        return await this.dao.update(id, updatedData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}

export default BookingsRepository;