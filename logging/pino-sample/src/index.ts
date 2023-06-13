import { logger, loggerHttp } from './utils/logger';
import http from 'http';
import express from 'express';

//#region Regular logs
logger.silent('Any test silent log 888');
logger.info({ some: { data: 'foo', message: 'bar', values: [15, 12, 10], boolProp: true, child: { another: 'value' } } }, 'Any test info log 123');
logger.error('Another test error log 123');
logger.warn('An warn log 321');

try {
    throw new Error('The message of the exception');
} catch (error) {
    logger.error(error);
}
//#endregion

//#region Using nodeJS http module
http.createServer(function (req, res) {
    loggerHttp(req, res); // that will log a request complete info and it's necessary to req.log.* works
    req.log.info('Some info');
    req.log.error('An error log');
    res.end('hello world from nodeJS native server');
}).listen(3000);
//#endregion


//#region Using express server
const app = express();

app.use(loggerHttp);

app.get('/', function (req, res) {
    req.log.warn('An warn log from express endpoint');

    try {
        throw new Error('The message of the exception');
    } catch (error) {
        logger.error(error); //that won't log the request details
        req.log.error(error);
    }

    res.send("Hello World!, I am server created by expresss");
})
app.get('/status400', function (req, res) {
    res.status(400).end(); //will log INFO request completed
})
app.get('/status503', function (req, res) {
    res.status(503).end(); //will log INFO request errored
})
app.get('/status500', function (req, res) {
    res.status(500).end(); //will log INFO request errored
})

app.listen(3001, function () {
    console.log("Express server started at 3001 port");
})
//#endregion