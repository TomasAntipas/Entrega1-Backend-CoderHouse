import mongoose from 'mongoose';
import Service from '../models/service.model.js';

class ServicesDAO {
    async getAll({
        category,
        available,
        page = 1,
        limit = 10,
        sortBy = 'name',
        order = 'asc'
    } = {}) {
        const filter = {};

        if (category) {
            filter.category = {
                $regex: `^${category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
                $options: 'i'
            };
        }

        if (available !== undefined) {
            filter.available = available;
        }

        const totalResults = await Service.countDocuments(filter);

        const totalPages = Math.ceil(totalResults / limit);
        const skip = (page - 1) * limit;

        const sortOrder = order === 'desc' ? -1 : 1;

        const results = await Service.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        return {
            results,
            totalResults,
            currentPage: page,
            limit,
            totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages
        };
    }

    async getById(id) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return Service.findById(id);
    }

    async create(serviceData) {
        return Service.create(serviceData);
    }

    async update(id, updatedData) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return Service.findByIdAndUpdate(
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

        return Service.findByIdAndDelete(id);
    }
}

export default ServicesDAO;