import ServicesService from '../services/services.service.js';

const servicesService = new ServicesService();

export const getServices = async (req, res) => {
    try {
        const result = await servicesService.getServices(
            req.validatedQuery
        );

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener servicios:', error);

        return res.status(500).json({
            error: 'Error al obtener los servicios'
        });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const service = await servicesService.getServiceById(
            req.params.sid
        );

        if (!service) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        return res.status(200).json(service);
    } catch (error) {
        console.error('Error al obtener servicio:', error);

        return res.status(500).json({
            error: 'Error al obtener el servicio'
        });
    }
};

export const createService = async (req, res) => {
    try {
        const newService = await servicesService.createService(req.body);

        req.app.get('io')?.emit('services:updated');

        return res.status(201).json(newService);
    } catch (error) {
        console.error('Error al crear servicio:', error);

        return res.status(500).json({
            error: 'Error al crear el servicio'
        });
    }
};

export const updateService = async (req, res) => {
    try {

        const updatedService = await servicesService.updateService(
            req.params.sid,
            req.body
        );

        if (!updatedService) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        req.app.get('io')?.emit('services:updated');

        return res.status(200).json(updatedService);
    } catch (error) {
        console.error('Error al actualizar servicio:', error);

        return res.status(500).json({
            error: 'Error al actualizar el servicio'
        });
    }
};

export const deleteService = async (req, res) => {
    try {
        const deletedService = await servicesService.deleteService(
            req.params.sid
        );

        if (!deletedService) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        req.app.get('io')?.emit('services:updated');

        return res.status(200).json(deletedService);
    } catch (error) {
        console.error('Error al eliminar servicio:', error);

        return res.status(500).json({
            error: 'Error al eliminar el servicio'
        });
    }
};