import { z } from 'zod';

const objectIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'El identificador debe ser un ObjectId válido'
);

const bookingServiceSchema = z.object({
    service: objectIdSchema,
    quantity: z.coerce
        .number()
        .int()
        .positive('La cantidad debe ser mayor que cero')
}).strict();

export const createBookingSchema = z.object({
    clientName: z.string()
        .trim()
        .min(1, 'El nombre del cliente es obligatorio'),

    clientEmail: z.string()
        .trim()
        .email('El correo electrónico no es válido'),

    date: z.string()
        .trim()
        .min(1, 'La fecha es obligatoria'),

    time: z.string()
        .trim()
        .min(1, 'La hora es obligatoria'),

    status: z.enum([
        'pending',
        'confirmed',
        'cancelled'
    ]).optional(),

    services: z.array(bookingServiceSchema).optional()
}).strict();

export const bookingParamsSchema = z.object({
    bid: objectIdSchema
});

export const addServiceParamsSchema = z.object({
    bid: objectIdSchema,
    sid: objectIdSchema
});

export const addServiceBodySchema = z.object({
    quantity: z.coerce
        .number()
        .int()
        .positive()
        .default(1)
}).strict();