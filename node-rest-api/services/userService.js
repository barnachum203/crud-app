const dal = require("../dal/dalUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Get all users:
 *
 * */
exports.getAllUsers = async () => {
  try {
    const users = await dal.getAllUsers();
    console.log(`[USER-SERV] - send ${users.length} users`);
    return users;
  } catch (error) {
    throw Error(err);
  }
};

/**
 * Register new user:
 *
 * */
exports.register = async (user) => {
  try {
    const result = await dal.createUser(user);

    if (!result) {
      console.log("[USER-SERV]: User already exist");

      throw Error("User already exist");
    }

    console.log("[USER-SERV]: User created successfully.");

    return { user };
  } catch (err) {
    throw Error(err);
  }
};

/**
 * Update user:
 *
 * */
exports.updateUser = async (user, id) => {
  const updatedUser = await dal.updateUserById(id, user);
  if (!updatedUser) {
    console.log("[USER-SERV]: User is not updated");

    throw Error("User is not updated");
  }
  console.log("[USER-SERV]: User updated.");

  return updatedUser;
};

exports.login = async (email, password) => {
  try {
    const user = await dal.getUserByEmail(email);
    if (user) {
      let auth = await bcrypt.compare(password, user.password);

      if (auth) {
        const token = creatToken(user._id);
        console.log("[USER-SERV]: User logged in: " + user.email);
        return { user: user, token: token };
      } else {
        console.log("[USER-SERV]: incorrect password");
        throw Error("incorrect password");
      }
    } else {
      console.log("[USER-SERV]: incorrect email");
      throw Error("incorrect email");
    }
  } catch (error) {
    console.log("[USER-SERV]: " + error.message);
    throw Error(error.message);
  }
};

exports.deleteUser = async (id) => {
  const result = await dal.deleteUser(id);
  if (!result) {
    console.log("[USER-SERV]: User is not deleted.");
    throw Error("User is not deleted.");
  }
  console.log("[USER-SERV]: User deleted: " + id);

  return result;
};

exports.getUserById = async (id) => {
  const result = await dal.getUserById(id);
  if (!result) {
    throw Error("User is not exist");
  }
  console.log("[USER-SERV]: Sent user: " + id);

  return result;
};

/**
 * JWT
 */
const maxAge = 2 * 24 * 60 * 60; //2d

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};
