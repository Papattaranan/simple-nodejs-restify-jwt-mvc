import winston from "winston";
import config from "./../Config";

const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      silent: false,
      timestamp: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
logger.debug("util:logger: initialized.");
logger.info(`util:logger: ENV LOG_LEVEL = ${(process.env.LOG_LEVEL || "info")}`);
