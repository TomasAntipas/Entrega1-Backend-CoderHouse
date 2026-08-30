import express from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = express.Router();

const serviceManager = new ServiceManager();

// GET /api/services
router.get('/', (req, res) => {
    const services = serviceManager.getServices();

    res.status(200).json(services);
});

// GET /api/services/:sid
router.get('/:sid', (req, res) => {
    const id = Number(req.params.sid);
    const service = serviceManager.getServiceById(id);

    if (!service) {
        return res.status(404).json({
            error: 'Servicio no encontrado'
        });
    }

    res.status(200).json(service);
});

// POST /api/services
router.post('/', (req, res) => {
    try {
        const newService = serviceManager.addService(req.body);

        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// PUT /api/services/:sid
router.put('/:sid', (req, res) => {
    const id = Number(req.params.sid);

    if (req.body.id !== undefined) {
        return res.status(400).json({
            error: 'No se puede modificar el id del servicio'
        });
    }

    const updatedService = serviceManager.updateService(id, req.body);

    if (!updatedService) {
        return res.status(404).json({
            error: 'Servicio no encontrado'
        });
    }

    res.status(200).json(updatedService);
});

// DELETE /api/services/:sid
router.delete('/:sid', (req, res) => {
    const id = Number(req.params.sid);

    const deletedService = serviceManager.deleteService(id);

    if (!deletedService) {
        return res.status(404).json({
            error: 'Servicio no encontrado'
        });
    }

    res.status(200).json(deletedService);
});

export default router;