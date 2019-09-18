const MODULE_ID = "api:user";

import logger from "./../../Utils/logger";
import { CreateUserController } from './../../Controllers/User/CreateUserController';
import { GetUserController } from './../../Controllers/User/GetUserController';
import message from "./../../Constants/message.constant";
import SuccessResponse from "./../../Responses/SuccessResponse";
import InternalServerErrorResponse from "./../../Responses/InternalServerErrorResponse";

module.exports = {
  /**
   * Create new user
   */
  register: async (req, res, next) => {
    logger.info(`%s: request register ${MODULE_ID}`);
    try {
      const result = await new CreateUserController(req.body).store();
      SuccessResponse(
        res,
        message.CREATE_SUCCESS.replace("{args}", "user"),
        result
      );
      logger.info(`%s: response register ${MODULE_ID} $ ${JSON.stringify(result)}`);
    } catch (exception) {
      logger.info(`%s: error register ${MODULE_ID} $ ${exception.message}`);
      InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * Get user detail
   */
  me: async (req, res, next) => {
    logger.info(`%s: request me ${MODULE_ID}`);
    try {
      const result = await new GetUserController().detail(req.user._id);
      SuccessResponse(
        res,
        message.GET_DETAIL_SUCCESS.replace("{args}", "user"),
        result
      );
      logger.info(`%s: response me ${MODULE_ID} $ ${JSON.stringify(result)}`);
    } catch (exception) {
      logger.info(`%s: error me ${MODULE_ID} $ ${exception.message}`);
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * User logout
   */
  logout: (req, res, next) => {
    logger.info(`%s: request logout ${MODULE_ID}`);
    console.log(req);
  },

  /**
   * User logout all devices
   */
  logoutAll: (req, res, next) => {
    logger.info(`%s: request logout all device ${MODULE_ID}`);
    console.log(req);
  }
};
