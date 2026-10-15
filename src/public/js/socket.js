const socket = io();

function renderServices(services) {
    const container =
        document.querySelector('#services-list') ||
        document.querySelector('#availability-services');

    if (!container) return;

    container.replaceChildren();

    if (services.length === 0) {
        container.textContent = 'No hay servicios registrados.';
        return;
    }

    services.forEach(service => {
        const card = document.createElement('article');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = service.name;

        const description = document.createElement('p');
        description.textContent = `Descripción: ${service.description || ''}`;

        const duration = document.createElement('p');
        duration.textContent = `Duración: ${service.duration} minutos`;

        const price = document.createElement('p');
        price.textContent = `Precio: $${service.price}`;

        const category = document.createElement('p');
        category.textContent = `Categoría: ${service.category || ''}`;

        const availability = document.createElement('p');
        availability.textContent = `Disponibilidad: ${
            service.available ? 'Disponible' : 'No disponible'
        }`;

        card.append(
            title,
            description,
            duration,
            price,
            category,
            availability
        );

        container.appendChild(card);
    });
}

async function refreshServices() {
    try {
        const response = await fetch('/api/services');

        if (!response.ok) {
            throw new Error('Error al obtener servicios');
        }

        const services = await response.json();
        renderServices(services);
    } catch (error) {
        console.error(error.message);
    }
}

async function refreshAvailability() {
    try {
        const response = await fetch('/views/availability');

        if (!response.ok) {
            throw new Error('Error al actualizar disponibilidad');
        }

        const html = await response.text();
        const updatedDocument = new DOMParser().parseFromString(
            html,
            'text/html'
        );

        ['availability-services', 'bookings-list'].forEach(id => {
            const current = document.getElementById(id);
            const updated = updatedDocument.getElementById(id);

            if (current && updated) {
                current.replaceWith(updated);
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

socket.on('services:updated', () => {
    refreshServices();
    refreshAvailability();
});

socket.on('bookings:updated', refreshAvailability);