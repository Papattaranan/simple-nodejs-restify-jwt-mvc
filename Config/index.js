require("dotenv").config();

/**
 * สร้าง prefix route paths.
 */
const API_ROOT = "/api";

module.exports = {
  LOG_LEVEL: process.env["LOG_LEVEL"] || "info",
  PORT: process.env["PORT"] || 8080,

  // key สำหรับ สร้าง/ยืนยัน jwt
  JWT_SECRET: process.env["JWT_SECRET"] || "&@$!plokmijn!$@&",
  JWT_EXPIRES: process.env["JWT_EXPIRES"] || '15m',
  SALT: process.env["SALT"] || "&@$!qazwsxedc!$@&",
  KEY_LEN: process.env["KEY_LEN"] || 32,
  DIGEST: process.env["DIGEST"] || "sha512",
  DB_HOST: process.env["DB_HOST"],
  DB_USER: process.env["USERNAME"],
  DB_PASS: process.env["PASSWORD"],

  // building route paths
  basePath: path => {
    return API_ROOT.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  }
};
