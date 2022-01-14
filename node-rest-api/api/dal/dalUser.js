const mongoose = require("mongoose");
const { User } = require("../../model/User");

/**
 * Get user by email
 */
module.exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

/**
 * Get all users
 */
module.exports.getAllUsers = async (email) => {
  const users = await User.find();
  return users;
};

/**
 * Get one user
 */
module.exports.getUserById = async (id) => {
  const user = await User.findById(mongoose.Types.ObjectId(id));
  return user;
};

/**
 * Update user
 */
module.exports.updateUserById = async (id, user) => {
  const result = await User.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    user
  );
  return result;
};

/**
 * Creates new user
 */
module.exports.createUser = async (userToCreate) => {
  const exist = await this.getUserByEmail(userToCreate.email);

  if (exist) {
    return null;
  }
  const newUser = await User.create(userToCreate);

  return newUser;
};

/**
 * Delete user
 */
module.exports.deleteUser = async (userId) => {
  const result = await User.findOneAndDelete(userId);

  return result;
};
