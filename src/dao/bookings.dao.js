import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingsPath = path.join(__dirname, '../data/bookings.json');

class BookingsDAO {
    async getAll() {
        const data = await fs.readFile(bookingsPath, 'utf-8');

        return JSON.parse(data);
    }

    async getById(id) {
        const bookings = await this.getAll();

        return bookings.find(
            booking => booking.id === Number(id)
        ) || null;
    }

    async create(bookingData) {
        const bookings = await this.getAll();

        const newId = bookings.length > 0
            ? Math.max(...bookings.map(booking => booking.id)) + 1
            : 1;

        const newBooking = {
            id: newId,
            ...bookingData
        };

        bookings.push(newBooking);

        await fs.writeFile(
            bookingsPath,
            JSON.stringify(bookings, null, 2)
        );

        return newBooking;
    }

    async update(id, updatedData) {
        const bookings = await this.getAll();

        const index = bookings.findIndex(
            booking => booking.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const updatedBooking = {
            ...bookings[index],
            ...updatedData,
            id: bookings[index].id
        };

        bookings[index] = updatedBooking;

        await fs.writeFile(
            bookingsPath,
            JSON.stringify(bookings, null, 2)
        );

        return updatedBooking;
    }
}

export default BookingsDAO;