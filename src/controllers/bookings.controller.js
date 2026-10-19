import BookingsService from '../services/bookings.service.js';

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingsService.createBooking(req.body);

        req.app.get('io')?.emit('bookings:updated');

        return res.status(201).json(newBooking);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await bookingsService.getBookingById(req.params.bid);

        if (!booking) {
            return res.status(404).json({
                error: 'Reserva no encontrada'
            });
        }

        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const { quantity = 1 } = req.body;

        const updatedBooking = await bookingsService.addServiceToBooking(
            bid,
            sid,
            quantity
        );

        if (!updatedBooking) {
            return res.status(404).json({
                error: 'Reserva no encontrada'
            });
        }

        req.app.get('io')?.emit('bookings:updated');

        return res.status(200).json(updatedBooking);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
};