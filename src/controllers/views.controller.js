import ServicesService from '../services/services.service.js';
import BookingsService from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

export const renderServices = async (req, res) => {
    try {
        const services = await servicesService.getServices();

        res.render('services', {
            title: 'Servicios disponibles',
            services: services.map(service => ({
                ...service.toObject(),
                availabilityText: service.available
                    ? 'Disponible'
                    : 'No disponible'
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los servicios');
    }
};

export const renderAvailability = async (req, res) => {
    try {
        const [services, bookings] = await Promise.all([
            servicesService.getServices(),
            bookingsService.getBookings()
        ]);

        res.render('availability', {
            title: 'Disponibilidad y reservas',
            services: services.map(service => ({
                ...service.toObject(),
                availabilityText: service.available
                    ? 'Disponible'
                    : 'No disponible'
            })),
            bookings: bookings.map(booking => ({
                ...booking.toObject(),
                date: booking.date,
                time: booking.time
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la disponibilidad');
    }
};