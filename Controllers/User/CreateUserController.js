import UserModel from "../../Models/User.model";

export class CreateUserController {
  /**
   * CreateUserController constructor
   * @param {*} data
   */
  constructor(data) {
    this._data = data;
  }

  /**
   * Store data DB
   * @returns {Promise<T>}
   */
  async store() {
    try {
      return await UserModel.create(this._data);
    } catch (error) {
      throw error;
    }
  }
}
