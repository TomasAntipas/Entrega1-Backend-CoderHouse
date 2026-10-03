
import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI,
};

if (!config.port) {
    console.error('Error: PORT no está definida.');
    process.exit(1);
}

if (!config.nodeEnv) {
    console.error('Error: NODE_ENV no está definida.');
    process.exit(1);
}

if (!config.mongoUri) {
    console.error('Error: MONGO_URI no está definida.');
    process.exit(1);
}

export default config;