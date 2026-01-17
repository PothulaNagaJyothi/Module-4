const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const upload = require('../middleware/upload.middleware');
const uniqueEmail = require('../middleware/uniqueEmail.middleware');

const dbPath = path.join(process.cwd(), 'db.json');

router.post('/signup', upload.single('profile'), uniqueEmail, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Profile image is required" });
    }

    const { name, email, password } = req.body;
    const dbData = await fs.readJson(dbPath);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password, 
      profilePic: req.file.path // This is the Cloudinary Secure URL
    };

    dbData.users.push(newUser);
    await fs.writeJson(dbPath, dbData, { spaces: 2 });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;