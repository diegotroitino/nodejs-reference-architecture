import pino from 'pino';
import pinoHttp from 'pino-http';
import { createWriteStream } from 'pino-http-send';
 
const stream = createWriteStream({
  url: 'http://localhost:1514',
});
 



// const transport = pino.transport({
//     targets: [
//     //   {
//     //     target: 'pino/file',
//     //     options: { destination: `${__dirname}/app.log` },
//     //   },
//       {
//         level: 'all',
//         target: 'pino-gelf',  
//         options: {'log -h': 'localhost', '-P': 'http', '-p': '1514'  },//sourceToken: '<your_logtail_source_token>' },
        
//       },
  
//     //   {
//     //     target: 'pino-pretty',
//     //   },
//     ],
//   });
  
  
const pinoParameters = {
    level: process.env.LOG_LEVEL || 'info',
    // transport: {
    //     target: 'pino-pretty',//'pino-http-print', //TODO: configure to NOT use pino-pretty or pino-http-print in production
    //     options: {
    //         destination: 1,
    //         all: true,
    //         translateTime: true
    //         //colorize: true 
    //         //another options in https://www.npmjs.com/package/pino-pretty#options
    //     }
    // }
}

export const logger = pino(pinoParameters, stream);
export const loggerHttp = pinoHttp({logger: logger});