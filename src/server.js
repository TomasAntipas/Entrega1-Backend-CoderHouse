import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import app from './app.js';
import config from './config/env.config.js';

const startServer = async () => {
    try {
        await mongoose.connect(config.mongoUri);

        console.log('Conexión a MongoDB establecida correctamente');

        const httpServer = createServer(app);
        const io = new Server(httpServer);

        app.set('io', io);

        io.on('connection', (socket) => {
            console.log('Cliente conectado:', socket.id);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado:', socket.id);
            });
        });

        httpServer.listen(config.port, () => {
            console.log(
                `Servidor escuchando en http://localhost:${config.port}`
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();