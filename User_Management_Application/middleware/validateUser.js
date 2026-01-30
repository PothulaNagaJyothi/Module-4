const validator = require('validator');

const validateUser = (req, res, next) => {
  const { name, email, password, age } = req.body;

  if (!name || validator.isEmpty(name)) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "A valid email is required" });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }
  if (age && (isNaN(age) || age < 18)) {
    return res.status(400).json({ error: "Age must be a number and at least 18" });
  }

  next();
};

module.exports = validateUser;