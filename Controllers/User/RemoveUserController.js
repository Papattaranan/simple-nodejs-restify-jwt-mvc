import UserModel from "../../Models/User.model";
import { NotFoundException } from "../../Exceptions/NotFoundException";
import message from "../../Constants/message.constant";

export class RemoveUserController {
  /**
   * UpdateUserController constructor
   *
   * @param {String} userId
   */
  constructor(userId) {
    this._userId = userId;
  }

  /**
   * Remove user data
   *
   * @returns {Promise}
   */
  async remove() {
    try {
      const removed = await UserModel.findByIdAndRemove(this._userId);

      if (!removed) {
        throw new NotFoundException(message.CANNOT_FIND_DATA);
      }

      return removed;
    } catch (exception) {
      throw exception;
    }
  }
}
