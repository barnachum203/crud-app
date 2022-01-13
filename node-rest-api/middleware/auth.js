// import { Response, Request, NextFunction } from "express";
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dal = require("../api/user/dalUser");

/**Check if user have an authorized token
 * @augments x-auth-token should be in request header.
 * @argument user
 */
const requireUser = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "User not authorized" });
  }
  // console.log("token verified.");

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log("jwt not verified.");

      return res.status(400).json({ message: "User not authorized" });
    }
    const users = await dal.getAllUsers();
    console.log("jwt verified.");

    next();
  });
};
module.exports = { requireUser };
