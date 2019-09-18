import { LoginController } from "../Controllers/Auth/LoginController";
import SuccessResponse from "../Responses/SuccessResponse";
import message from "../Constants/message.constant";
import { UnauthorizedException } from "../Exceptions/UnauthorizedException";
import UnauthorizedResponse from "../Responses/UnauthorizedResponse";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";

import jwt from "jsonwebtoken";

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

  /**
   * Validate token route
   */
  server.get("/auth/validate", async (req, res) => {
    console.log(req.headers)
    try {
      /**
       * อ่านไฟล์ .env
       */
      require("dotenv").config({
        path: "./../.env"
      });

      /**
       * Verify token
       */
      jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, result) => {
        if (err) {
          throw err;
        } else {
          SuccessResponse(res, message.SUCCESS_VALIDATE, result)
        }
      });
    } catch (exception) {
      if (exception instanceof jwt.TokenExpiredError)
        UnauthorizedResponse(res, message.TOKEN_EXPIRED);
      else InternalServerErrorResponse(res, message.INVALID_TOKEN);
    }
  });
};
