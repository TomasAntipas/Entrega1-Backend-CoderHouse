import { z } from 'zod';

export const createServiceSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'El nombre es obligatorio'),

    description: z.string()
        .trim()
        .optional(),

    duration: z.coerce
        .number()
        .int('La duración debe ser un número entero')
        .positive('La duración debe ser mayor que cero'),

    price: z.coerce
        .number()
        .finite('El precio debe ser un número válido')
        .nonnegative('El precio no puede ser negativo'),

    category: z.string()
        .trim()
        .min(1, 'La categoría es obligatoria'),

    available: z.boolean().optional()
}).strict();

export const updateServiceSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'El nombre no puede estar vacío')
        .optional(),

    description: z.string()
        .trim()
        .optional(),

    duration: z.coerce
        .number()
        .int()
        .positive('La duración debe ser mayor que cero')
        .optional(),

    price: z.coerce
        .number()
        .finite()
        .nonnegative('El precio no puede ser negativo')
        .optional(),

    category: z.string()
        .trim()
        .min(1, 'La categoría no puede estar vacía')
        .optional(),

    available: z.boolean().optional()
})
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        'Debés enviar al menos un campo para actualizar'
    );

export const serviceQuerySchema = z.object({
    category: z.string().trim().optional(),

    available: z.enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),

    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100, 'El límite máximo es 100')
        .default(10),

    sortBy: z.enum([
        'name',
        'description',
        'duration',
        'price',
        'category',
        'available'
    ]).default('name'),

    order: z.enum(['asc', 'desc']).default('asc')
});