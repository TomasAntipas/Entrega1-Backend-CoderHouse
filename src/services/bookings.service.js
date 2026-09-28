import BookingsRepository from '../repositories/bookings.repository.js';
import ServicesRepository from '../repositories/services.repository.js';

class BookingsService {
    constructor() {
        this.repository = new BookingsRepository();
        this.servicesRepository = new ServicesRepository();
    }

    async createBooking(bookingData) {
        const requiredFields = [
            'clientName',
            'clientEmail',
            'date',
            'time',
            'status'
        ];

        const hasAllFields = requiredFields.every(
            field => bookingData[field] !== undefined
        );

        if (!hasAllFields) {
            throw new Error(
                'La reserva debe contener todos los campos requeridos'
            );
        }

        const newBooking = {
            clientName: bookingData.clientName,
            clientEmail: bookingData.clientEmail,
            date: bookingData.date,
            time: bookingData.time,
            status: bookingData.status,
            services: bookingData.services || []
        };

        return await this.repository.create(newBooking);
    }

    async getBookingById(id) {
        return await this.repository.getById(id);
    }

    async addServiceToBooking(bookingId, serviceId) {
        const booking = await this.repository.getById(bookingId);

        if (!booking) {
            return null;
        }

        const service = await this.servicesRepository.getById(serviceId);

        if (!service) {
            const error = new Error('Servicio no encontrado');
            error.status = 404;
            throw error;
        }

        const services = booking.services || [];

        const existingService = services.find(
            item => item.service === Number(serviceId)
        );

        if (existingService) {
            existingService.quantity += 1;
        } else {
            services.push({
                service: Number(serviceId),
                quantity: 1
            });
        }

        booking.services = services;

        return await this.repository.update(
            bookingId,
            {
                services: booking.services
            }
        );
    }
}

export default BookingsService;