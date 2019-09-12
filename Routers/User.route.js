import { CreateUserController } from "../Controllers/User/CreateUserController";
import SuccessResponse from "../Responses/SuccessResponse";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";
import { UpdateUserController } from "../Controllers/User/UpdateUserController";
import { NotFoundException } from "../Exceptions/NotFoundException";
import NotFoundResponse from "../Responses/NotFoundResponse";

module.exports = server => {
  /**
   * Create new user route
   */
  server.post("/user", async (req, res) => {
    try {
      const result = await new CreateUserController(req.body).store();
      SuccessResponse(res, "Successfully create new user", result);
    } catch (exception) {
      InternalServerErrorResponse(res, exception.message);
    }
  });

  /**
   * Update user route
   */
  server.patch("/user/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const result = await new UpdateUserController(id, body).update();
      SuccessResponse(res, "Successfully update user data!", result);
    } catch (exception) {
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  });
};
