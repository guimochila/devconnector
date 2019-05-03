import path from 'path';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      info => `[${info.timestamp}] - ${info.level} - ${info.message}`,
    ),
  ),
  transports: [
    new transports.File({
      maxsize: 512000,
      maxFiles: 5,
      filename: path.join(__dirname, '../../logs/logs-api.log'),
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});

export default logger;
