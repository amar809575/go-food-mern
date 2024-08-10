const express = require("express");
const router = express.Router();
const User = require("../modals/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MyNameKhanAndIAmNotATerrorist$#$#";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 4 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    let userExists = await User.findOne({ email: req.body.email });
    if(userExists) {
        return res.status(400).json({ error: "User with this email already exists" });
    }
    
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    
     await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Invalid email or password" });
      }

      const pwdCompare = await bcrypt.compare(
        password,
        userData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  }
);

router.post('/myUserData', async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ error: "Email is required" });
        }

        let myUser = await User.findOne({ email: req.body.email });
        if (!myUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user_data: myUser });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});


module.exports = router;
