const MODULE_ID = "api:hello";

import logger from "./../../Utils/logger";
import SuccessResponse from "./../../Responses/SuccessResponse";
import message from "./../../Constants/message.constant";

module.exports = (req, res, next) => {
  logger.info(`%s: request received ${MODULE_ID}`);

  SuccessResponse(res, message.SUCCESSFULLY, { ping: "OK" });

  logger.info(`%s: response sent ${MODULE_ID}`);
  return next();
};
