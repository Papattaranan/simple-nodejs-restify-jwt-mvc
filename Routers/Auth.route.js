import { LoginController } from "../Controllers/Auth/LoginController";
import SuccessResponse from "../Responses/SuccessResponse";
import message from "../Constants/message.constant";
import { UnauthorizedException } from "../Exceptions/UnauthorizedException";
import UnauthorizedResponse from "../Responses/UnauthorizedResponse";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";

module.exports = server => {
  /**
   * Login route
   */
  server.post("/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await new LoginController(username, password).login();
      SuccessResponse(res, message.LOGIN_SUCCESS, result);
    } catch (exception) {
      if (exception instanceof UnauthorizedException)
        UnauthorizedResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  });
};
