import express from 'express';

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from '../controllers/services.controller.js';

import {
    createServiceSchema,
    updateServiceSchema,
    serviceQuerySchema
} from '../validators/services.validator.js';

import {
    validateBody,
    validateQuery
} from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get(
    '/',
    validateQuery(serviceQuerySchema),
    getServices
);

router.get('/:sid', getServiceById);

router.post(
    '/',
    validateBody(createServiceSchema),
    createService
);

router.put(
    '/:sid',
    validateBody(updateServiceSchema),
    updateService
);

router.delete('/:sid', deleteService);

export default router;