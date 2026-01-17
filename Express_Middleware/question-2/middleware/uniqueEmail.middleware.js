const fs = require('fs-extra');
const path = require('path');

const uniqueEmail = async (req, res, next) => {
  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    
    if (!fs.existsSync(dbPath)) {
      await fs.writeJson(dbPath, { users: [] });
    }

    const data = await fs.readJson(dbPath);
    const { email } = req.body;

    const userExists = data.users.find(u => u.email === email);
    if (userExists) {
      return res.status(409).json({ error: "Email already exists" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Server Error during email validation" });
  }
};

module.exports = uniqueEmail;