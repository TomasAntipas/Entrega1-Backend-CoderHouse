import express from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = express.Router();

const serviceManager = new ServiceManager();

// GET /api/services
router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query;

        let services = await serviceManager.getServices();

        if (category) {
            services = services.filter(
                service =>
                    service.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (available !== undefined) {
            services = services.filter(
                service => service.available === (available === 'true')
            );
        }

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// GET /api/services/:sid
router.get('/:sid', async (req, res) => {
    try {
        const service = await serviceManager.getServiceById(req.params.sid);

        if (!service) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// POST /api/services
router.post('/', async (req, res) => {
    try {
        const newService = await serviceManager.addService(req.body);

        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// PUT /api/services/:sid
router.put('/:sid', async (req, res) => {
    try {
        if (req.body.id !== undefined) {
            return res.status(400).json({
                error: 'No se puede modificar el id del servicio'
            });
        }

        const updatedService = await serviceManager.updateService(
            req.params.sid,
            req.body
        );

        if (!updatedService) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE /api/services/:sid
router.delete('/:sid', async (req, res) => {
    try {
        const deletedService = await serviceManager.deleteService(
            req.params.sid
        );

        if (!deletedService) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        res.status(200).json(deletedService);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;