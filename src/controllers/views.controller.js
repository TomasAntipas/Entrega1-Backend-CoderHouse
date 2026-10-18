import ServicesService from '../services/services.service.js';
import BookingsService from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

const getAllServicesForViews = async () => {
    const pagination = await servicesService.getServices({
        page: 1,
        limit: 100,
        sortBy: 'name',
        order: 'asc'
    });

    return pagination.results.map((service) => {
        const item = service.toObject();

        return {
            ...item,
            availabilityText: item.available
                ? 'Disponible'
                : 'No disponible'
        };
    });
};

export const renderServices = async (req, res) => {
    try {
        const services = await getAllServicesForViews();

        return res.render('services', {
            title: 'Servicios disponibles',
            services
        });
    } catch (error) {
        console.error('Error al cargar servicios:', error);

        return res.status(500).send(
            'Error al cargar los servicios'
        );
    }
};

export const renderAvailability = async (req, res) => {
    try {
        const [services, bookings] = await Promise.all([
            getAllServicesForViews(),
            bookingsService.getBookings()
        ]);

        const formattedBookings = bookings.map((booking) => {
            const item = booking.toObject();

            return {
                ...item,
                date: item.date,
                time: item.time
            };
        });

        return res.render('availability', {
            title: 'Disponibilidad y reservas',
            services,
            bookings: formattedBookings
        });
    } catch (error) {
        console.error('Error al cargar disponibilidad:', error);

        return res.status(500).send(
            'Error al cargar la disponibilidad'
        );
    }
};