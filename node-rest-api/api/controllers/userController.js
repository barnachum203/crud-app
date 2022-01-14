const userService = require("../services/userService");

/**
 * Get all users:
 *
 * */
module.exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Register new user:
 *
 * */
module.exports.register = async (req, res) => {
  console.log("[Register-User]:");
  try {
    const result = await userService.register(req.body);

    if (!result) {
      console.log("User already exist");
      return res.status(400).json({ message: "User already exist" });
    }

    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    // console.log(err);
    res.status(404).json({ message: err.message });
  }
};

/**
 * Update user:
 *
 * */
module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  try {
    const result = await userService.updateUser(user, id);
    res.status(201).json({ message: "User updated." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  console.log("[Login-User]:");
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    res.status(201).json({ user: user.user, token: user.token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  console.log("[Delete-User]:");

  const { id } = req.params;
  try {
    const result = await userService.deleteUser(id);
    res.status(201).json({ message: "User deleted." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  console.log("[Get-User]:");

  const { id } = req.params;
  try {
    const result = await userService.getUserById(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


