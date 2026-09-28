import BookingsService from '../services/bookings.service.js';

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingsService.createBooking(
            req.body
        );

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await bookingsService.getBookingById(
            req.params.bid
        );

        if (!booking) {
            return res.status(404).json({
                error: 'Reserva no encontrada'
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const updatedBooking =
            await bookingsService.addServiceToBooking(
                req.params.bid,
                req.params.sid
            );

        if (!updatedBooking) {
            return res.status(404).json({
                error: 'Reserva no encontrada'
            });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: error.message
        });
    }
};