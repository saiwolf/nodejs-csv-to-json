import morgan, { StreamOptions } from "morgan";
import { envName } from '../_config';

import Logger from "../_config/logger";

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
}

const skip = () => {    
    return envName !== 'development';
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)

export default morganMiddleware