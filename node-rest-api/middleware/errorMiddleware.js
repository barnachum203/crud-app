module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = req.body;
    if (error) {
      console.log("[USER-VALIDATE]: user error: ", error);
      return res.status(400).json(error.details[0].message);
    }
    console.log("[USER-VALIDATE]: user valid.");
    next();
  };
};
