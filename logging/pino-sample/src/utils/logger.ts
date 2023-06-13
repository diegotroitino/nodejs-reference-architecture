import pino from 'pino';
import pinoHttp from 'pino-http';

const pinoParameters = {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',//'pino-http-print', //TODO: configure to NOT use pino-pretty or pino-http-print in production
        options: {
            destination: 1,
            all: true,
            translateTime: true
            //colorize: true 
            //another options in https://www.npmjs.com/package/pino-pretty#options
        }
    }
}

export const logger = pino(pinoParameters);
export const loggerHttp = pinoHttp({logger: logger});