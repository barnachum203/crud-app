const jwt = require("jsonwebtoken");
const dal = require("./dalUser");
const bcrypt = require("bcryptjs");

/**
 * Get all users:
 * can get all users
 * */
module.exports.getAll = async (req, res) => {
  // Get all users from database
  const users = await dal.getAllUsers();

  console.log(`[GET-ALL] - send ${users.length} users`);

  res.status(201).json(users);
};

const maxAge = 3 * 24 * 60 * 60;
/**
 * Get all users:
 * can get all users
 *
 * @param:
 * id - user id
 * */
module.exports.register = async (req, res) => {
  console.log("[Register-User]:");

  try {
    const result = await dal.createUser(req.body);
    // console.log(result);

    if (!result) {
      console.log("User already exist");
      res.status(400).json({ message: "User already exist" });
      return;
    }

    const token = await creatToken(result._id);
    console.log("User created successfully.");

    res.status(201).json({ user: result._id, token: token });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

/**
 * Delete user:
 *
 * @param:
 * user - user
 * */
module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  const updatedUser = await dal.updateUserById(id, user);
  if (!updatedUser) {
    console.log("[Update-User]: User is not updated");

    res.status(404).json({ message: "User is not updated" });
  }
  console.log("[Update-User]: User updated");

  res.status(201).json(updatedUser);
};

module.exports.login = async (req, res) => {
  console.log("[Login-User]:");

  const { email, password } = req.body;
  try {
    const user = await dal.getUserByEmail(email);
    if (user) {
      let auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = creatToken(user._id);

        console.log("User logged in: " + user.email);
        res.status(201).json({ user: user, token: token });
      } else {
        console.log("incorrect password");

        res.status(403).json({ message: "incorrect password" });
      }
    } else {
      console.log("incorrect email");

      res.status(403).json({ message: "incorrect email" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "No User found" });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await dal.deleteUser(id);
  if (!result) {
    console.log("[Delete-User]: User is not deleted ");
    res.status(404).json({ message: "User is not deleted" });
  }
  console.log("[Delete-User]: User deleted: " + id);

  res.status(201).json(result);
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await dal.getUserById(id);
  if (!result) {
    res.status(404).json({ message: "User is not exist" });
  }
  console.log("[User-By-Id]: sent user: " + id);

  res.status(201).json(result);
};

/**
 * JWT
 */

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};
