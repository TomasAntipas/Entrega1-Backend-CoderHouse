import mongoose from 'mongoose';
import Booking from '../models/booking.model.js';

class BookingsDAO {
    async getById(id) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await Booking.findById(id);
    }

    async create(bookingData) {
        return await Booking.create(bookingData);
    }

    async update(id, updatedData) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await Booking.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true,
                runValidators: true
            }
        );
    }
}

export default BookingsDAO;