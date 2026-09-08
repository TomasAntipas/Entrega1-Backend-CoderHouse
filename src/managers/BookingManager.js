import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingsPath = path.join(__dirname, '../data/bookings.json');

class BookingManager {
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

        const bookings = await this.getBookings();

        const newId = bookings.length > 0
            ? Math.max(...bookings.map(booking => booking.id)) + 1
            : 1;

        const newBooking = {
            id: newId,
            clientName: bookingData.clientName,
            clientEmail: bookingData.clientEmail,
            date: bookingData.date,
            time: bookingData.time,
            status: bookingData.status,
            services: bookingData.services || []
        };

        bookings.push(newBooking);

        await this.saveBookings(bookings);

        return newBooking;
    }

    async getBookings() {
        const data = await fs.readFile(bookingsPath, 'utf-8');
        return JSON.parse(data);
    }

    async getBookingById(id) {
        const bookings = await this.getBookings();

        return bookings.find(
            booking => booking.id === Number(id)
        ) || null;
    }

    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.getBookings();

        const booking = bookings.find(
            booking => booking.id === Number(bookingId)
        );

        if (!booking) {
            return null;
        }

        const existingService = booking.services.find(
            item => item.service === Number(serviceId)
        );

        if (existingService) {
            existingService.quantity += 1;
        } else {
            booking.services.push({
                service: Number(serviceId),
                quantity: 1
            });
        }

        await this.saveBookings(bookings);

        return booking;
    }

    async saveBookings(bookings) {
        await fs.writeFile(
            bookingsPath,
            JSON.stringify(bookings, null, 2)
        );
    }
}

export default BookingManager;