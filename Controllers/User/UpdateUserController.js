import UserModel from "../../Models/User.model";
import { NotFoundException } from "../../Exceptions/NotFoundException";
import message from "../../Constants/message.constant";

export class UpdateUserController {
  /**
   * UpdateUserController constructor
   *
   * @param {String} userId
   * @param {Object} data
   */
  constructor(userId, data) {
    this._userId = userId;
    this._data = data;
  }

  /**
   * Update user data
   *
   * @returns {Promise}
   */
  async update() {
    try {
      const updated = await UserModel.findByIdAndUpdate(
        this._userId,
        {
          $set: this._data
        },
        {
          new: true
        }
      );

      if (!updated) {
        throw new NotFoundException(message.CANNOT_FIND_DATA);
      }

      return updated;
    } catch (exception) {
      throw exception;
    }
  }
}
