import BookingsRepository from "../repositories/bookings.repository.js";
import ServicesRepository from "../repositories/services.repository.js";

class BookingsService {
  constructor() {
    this.repository = new BookingsRepository();
    this.servicesRepository = new ServicesRepository();
  }

  async getAllBookings() {
    return await this.repository.getAll();
  }

  async getBookingById(bookingId) {
    return await this.repository.getById(bookingId);
  }

  async createBooking(bookingData) {
    const services = bookingData.services || [];

    for (const item of services) {
      const service = await this.servicesRepository.getById(
        item.service
      );

      if (!service) {
        throw new Error(`Servicio no encontrado: ${item.service}`);
      }
    }

    return await this.repository.create(bookingData);
  }

  async updateBooking(bookingId, bookingData) {
    return await this.repository.update(bookingId, bookingData);
  }

  async deleteBooking(bookingId) {
    return await this.repository.delete(bookingId);
  }

  async addServiceToBooking(bookingId, serviceId, quantity = 1) {
    const booking = await this.repository.getById(bookingId);

    if (!booking) {
      throw new Error("Reserva no encontrada");
    }

    const service = await this.servicesRepository.getById(serviceId);

    if (!service) {
      throw new Error("Servicio no encontrado");
    }

    const services = booking.services || [];

    const existingService = services.find((item) => {
      const currentServiceId = item.service?._id ?? item.service;

      return currentServiceId.toString() === service._id.toString();
    });

    if (existingService) {
      existingService.quantity += Number(quantity);
    } else {
      services.push({
        service: service._id,
        quantity: Number(quantity),
      });
    }

    return await this.repository.update(bookingId, { services });
  }
}

export default BookingsService;