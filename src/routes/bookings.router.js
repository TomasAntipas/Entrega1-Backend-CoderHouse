import express from 'express';

import {
    createBooking,
    getBookingById,
    addServiceToBooking
} from '../controllers/bookings.controller.js';

import {
    createBookingSchema,
    bookingParamsSchema,
    addServiceParamsSchema,
    addServiceBodySchema
} from '../validators/bookings.validator.js';

import {
    validateBody,
    validateParams
} from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post(
    '/',
    validateBody(createBookingSchema),
    createBooking
);

router.get(
    '/:bid',
    validateParams(bookingParamsSchema),
    getBookingById
);

router.post(
    '/:bid/services/:sid',
    validateParams(addServiceParamsSchema),
    validateBody(addServiceBodySchema),
    addServiceToBooking
);

export default router;