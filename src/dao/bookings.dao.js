import Booking from "../models/booking.model.js";

class BookingsDAO {
    async getAll() {
    return await Booking.find().populate("services.service");
    }

    async getById(id) {
    return await Booking.findById(id).populate("services.service");
    }

    async create(bookingData) {
    const booking = new Booking(bookingData);
    return await booking.save();
    }

    async update(id, bookingData) {
    return await Booking.findByIdAndUpdate(id, bookingData, {
        new: true,
        runValidators: true,
    }).populate("services.service");
    }

    async delete(id) {
    return await Booking.findByIdAndDelete(id);
    }
}

export default BookingsDAO;