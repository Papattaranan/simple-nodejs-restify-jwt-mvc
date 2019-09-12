import { CreateUserController } from "../Controllers/User/CreateUserController";
import SuccessResponse from "../Responses/SuccessResponse";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";

module.exports = server => {
  /**
   * Create new user route
   */
  server.post("/user/create", async (req, res) => {
    try {
      const result = await new CreateUserController(req.body).store();
      SuccessResponse(res, "Successfully create new user", result);
    } catch (exception) {
      InternalServerErrorResponse(res, exception.message);
    }
  });
};
