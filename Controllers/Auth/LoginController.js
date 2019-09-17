import UserModel from "../../Models/User.model";
import UnauthorizedException from "../../Exceptions/UnauthorizedException";
import message from "../../Constants/message.constant";
import { TokenGenerator } from "../../Helpers/TokenGenerator";

export class LoginController {
  /**
   * LoginController constructor
   * @param {String} username
   * @param {String} password
   */
  constructor(username, password) {
    this._username = username;
    this._password = password;
  }

  /**
   * Login
   *
   * @returns {Promise}
   */
  async login() {
    try {
      const result = await UserModel.findOne({
        username: this._username,
        password: this._password
      })
        .select("_id + name + phone + username")
        .lean();

      if (result !== null) {
        // สร้าง token
        const token = new TokenGenerator(result).generate();
        console.log(token)

        return {
          token: token
        };
      } else {
        throw new UnauthorizedException(message.INVALID_USER_OR_PASSWORD);
      }
    } catch (error) {
      throw error;
    }
  }
}
