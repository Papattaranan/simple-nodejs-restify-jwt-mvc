import { CreateUserController } from "../Controllers/User/CreateUserController";
import SuccessResponse from "../Responses/SuccessResponse";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";
import { UpdateUserController } from "../Controllers/User/UpdateUserController";
import { RemoveUserController } from "../Controllers/User/RemoveUserController";
import { NotFoundException } from "../Exceptions/NotFoundException";
import NotFoundResponse from "../Responses/NotFoundResponse";
import { GetUserController } from "../Controllers/User/GetUserController";

module.exports = server => {
  /**
   * Create new user route
   */
  server.post("/users", async (req, res) => {
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
  server.patch("/users/:id", async (req, res) => {
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

  /**
   * Remove user route
   */
  server.del("/users", async (req, res) => {
    try {
      await new RemoveUserController(req.body.userId).remove();
      SuccessResponse(res, "Successfully remove user!", null);
    } catch (exception) {
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  });

  /**
   * Get all user route
   */
  server.get("/users", async (req, res) => {
    try {
      const result = await new GetUserController().all();
      SuccessResponse(res, "Successfully get all users!", result);
    } catch (exception) {
      InternalServerErrorResponse(res, exception.message);
    }
  });

  /**
   * Get detail user
   */
  server.get("/users/:id", async (req, res) => {
    try {
      const result = await new GetUserController().detail(req.params.id);
      SuccessResponse(res, "Successfully get detail user!", result);
    } catch (exception) {
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  });
};
