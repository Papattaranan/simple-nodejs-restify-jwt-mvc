import UserModel from "../../Models/User.model";
import User from "../../Models/User.model";
import { NotFoundException } from "../../Exceptions/NotFoundException";

export class GetUserController {
  /**
   * Get all users
   *
   * @returns {Promise}
   */
  async all() {
    try {
      return await UserModel.find().lean();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user detail by user ID
   *
   * @param {String} userId
   * @returns {Promise}
   */
  async detail(userId) {
    try {
      const userResult = UserModel.findById(userId).lean();
      if (!userResult) {
        throw new NotFoundException("Couldn't find any user data!");
      }
      return userResult;
    } catch (error) {
      throw error;
    }
  }
}
