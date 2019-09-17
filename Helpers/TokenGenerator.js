import jwt from "jsonwebtoken";

export class TokenGenerator {
  /**
   * TokenGenerator constructor
   * @param {any} data
   */
  constructor(data) {
    this._data = data;
  }

  /**
   * Generate token
   *
   * @returns {*}
   */
  generate() {
    /**
     * อ่านไฟล์ .env
     */
    require("dotenv").config({
      path: "./../.env"
    });

    return jwt.sign(this._data, process.env.JWT_SECRET, {
      expiresIn: 200 // token จะหมดอายุใน 200 นาที
    });
  }
}
