import mongoose from 'mongoose';
import Service from '../models/service.model.js';

class ServicesDAO {
    async getAll() {
        return await Service.find();
    }

    async getById(id) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await Service.findById(id);
    }

    async create(serviceData) {
        return await Service.create(serviceData);
    }

    async update(id, updatedData) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await Service.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await Service.findByIdAndDelete(id);
    }
}

export default ServicesDAO;