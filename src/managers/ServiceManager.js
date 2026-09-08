import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, '../data/services.json');

class ServiceManager {
    async getServices() {
        const data = await fs.readFile(servicesPath, 'utf-8');
        return JSON.parse(data);
    }

    async getServiceById(id) {
        const services = await this.getServices();

        return services.find(
            service => service.id === Number(id)
        ) || null;
    }

    async addService(serviceData) {
        const services = await this.getServices();

        const requiredFields = [
            'name',
            'description',
            'duration',
            'price',
            'category',
            'available'
        ];

        const hasAllFields = requiredFields.every(
            field => serviceData[field] !== undefined
        );

        if (!hasAllFields) {
            throw new Error(
                'El servicio debe contener todos los campos requeridos'
            );
        }

        const newId = services.length > 0
            ? Math.max(...services.map(service => service.id)) + 1
            : 1;

        const newService = {
            ...serviceData,
            id: newId
        };

        services.push(newService);

        await this.saveServices(services);

        return newService;
    }

    async updateService(id, updatedData) {
        const services = await this.getServices();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const updatedService = {
            ...services[index],
            ...updatedData,
            id: services[index].id
        };

        services[index] = updatedService;

        await this.saveServices(services);

        return updatedService;
    }

    async deleteService(id) {
        const services = await this.getServices();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const deletedService = services.splice(index, 1)[0];

        await this.saveServices(services);

        return deletedService;
    }

    async saveServices(services) {
        await fs.writeFile(
            servicesPath,
            JSON.stringify(services, null, 2)
        );
    }
}

export default ServiceManager;