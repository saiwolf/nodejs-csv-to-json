import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || '3000';
const envName = process.env.NODE_ENV || 'development';
const isDev: boolean = process.env.NODE_ENV !== 'development';

export {
    PORT,
    envName,
    isDev,
}