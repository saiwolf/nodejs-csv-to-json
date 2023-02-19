import express from 'express';
import { isDev, PORT } from './_config';
import Logger from './_config/logger';
import morganMiddleware from './_middleware/morganMiddleware';

const app = express();

app.use(morganMiddleware);

app.get('./favicon.ico', (_, res) => {
    res.status(200).send(null);
})

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
    Logger.info(`Listening on port ${PORT}`);
});