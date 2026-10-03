import mongoose from 'mongoose';
import app from './app.js';
import config from './config/env.config.js';

const startServer = async () => {
    try {
        await mongoose.connect(config.mongoUri);

        console.log('Conexión a MongoDB establecida correctamente');

        app.listen(config.port, () => {
            console.log(
                `Servidor escuchando en http://localhost:${config.port}`
            );
        });
    } catch (error) {
        console.error(
            'Error al conectar con MongoDB:',
            error.message
        );

        process.exit(1);
    }
};

startServer();