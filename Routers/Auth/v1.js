const MODULE_ID = "app:auth";

import logger from "./../../Utils/logger";
import SuccessResponse from "./../../Responses/SuccessResponse";
import UnauthorizedResponse from "./../../Responses/UnauthorizedResponse";
import InternalServerErrorResponse from "./../../Responses/InternalServerErrorResponse";
import { LoginController } from "./../../Controllers/Auth/LoginController";
import message from "./../../Constants/message.constant";
import { UnauthorizedException } from "../../Exceptions/UnauthorizedException";

module.exports = {
  /**
   * Login a registered user
   */
  login: async (req, res, next) => {
    logger.info(`%s: request login ${MODULE_ID}`);
    try {
      const { email, password } = req.body;
      const result = await new LoginController(email, password).login();
      SuccessResponse(res, message.LOGIN_SUCCESS, result);
      logger.info(
        `%s: response login ${MODULE_ID} $ ${JSON.stringify(result)}`
      );
    } catch (exception) {
      logger.info(`%s: error login ${MODULE_ID} $ ${exception.message}`);
      if (exception instanceof UnauthorizedException)
        UnauthorizedResponse(res, exception._message);
      else InternalServerErrorResponse(res, exception.message);
    }
  }
};
