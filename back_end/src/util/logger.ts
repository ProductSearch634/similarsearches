import pino, { DestinationStream, Logger, LoggerOptions } from 'pino';

export const createLogger = (opts?: LoggerOptions | DestinationStream): Logger => pino(opts);

export const getTimestamp = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    var customDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `, "timestamp": ${customDateString}`;
}