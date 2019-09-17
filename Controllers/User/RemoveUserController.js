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

      if (removed !== null) {
        return removed;
      } else {
        throw new NotFoundException(message.CANNOT_FIND_DATA);
      }
    } catch (exception) {
      throw exception;
    }
  }
}
