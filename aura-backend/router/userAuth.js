const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Root route
router.get("/", (req, res) => {
  res.send("Hello from server router js");
});

// Register route
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "All fields are necessary" });
  }

  try {
    // Validate by checking if the user already exists
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    }

    // Create new user instance
    const user = new User({ name, email, phone, password, cpassword });

    // we need to encrypt the password and Cpassword  before saving

    // Save user to database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
  }
});

// Login Route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill the data" });
    }

    // Checking if email is same = > findone is moongoose method
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // Using tokens to verify user using JWT
      const token = await userLogin.generateAuthToken();

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });

      } else {
        res.json({ message: "User signed in Successfully" });
      }

    }else{
      res.status(400).json({ error: "Invalid credentials" });
    }


  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
