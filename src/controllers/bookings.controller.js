import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js';

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();


export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingManager.createBooking(req.body);

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};


export const getBookingById = async (req, res) => {
    try {
        const booking = await bookingManager.getBookingById(
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
        const booking = await bookingManager.getBookingById(
            req.params.bid
        );

        if (!booking) {
            return res.status(404).json({
                error: 'Reserva no encontrada'
            });
        }

        const serviceId = Number(req.params.sid);

        const service = await serviceManager.getServiceById(serviceId);

        if (!service) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        const updatedBooking = await bookingManager.addServiceToBooking(
            req.params.bid,
            serviceId
        );

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};