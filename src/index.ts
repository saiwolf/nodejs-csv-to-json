import express from 'express';
import { isDev, PORT } from './_config';
import Logger from './_config/logger';
import morganMiddleware from './_middleware/morganMiddleware';
import csvRoutes from './routes/csv';
import path from 'path';

const app = express();
const publicFiles = path.resolve(__dirname, '../public')

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicFiles, { index: 'index.html', }));

app.use('/csv', csvRoutes);

if (isDev) {
    app.get("/logger", (_, res) => {
        Logger.error("This is an error log.");
        Logger.warn("This is a warning log.");
        Logger.info("This is an info log.");
        Logger.http("This is an http log");
        Logger.debug("This is a debug log");

        res.status(200).send("Check your console!");
    })
}

app.listen(PORT, () => {
    Logger.info(`Serving static files at: ${publicFiles}`);
    Logger.info(`Listening on port ${PORT}`);
});