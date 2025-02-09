const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const senderEmail = process.env.REACT_APP_EMAIL;
const senderPassword = process.env.REACT_APP_PASSWORD;

// Helper function to generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to send a verification email
const sendVerificationEmail = async (email, code) => {
  if (!senderEmail || !senderPassword) {
    console.error("Email credentials are missing.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    });

    await transporter.sendMail({
      from: "Cloudy Book <sulemanafzal993@gmail.com>",
      to: email,
      subject: "Email Verification Code",
      html: `
        <h1>Email Verification</h1>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
    throw new Error("Failed to send verification email.");
  }
};

// Register a new user
router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/\d/)
      .withMessage("Password must contain at least one number.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      // Hash the password and generate a verification token
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = generateVerificationCode();
      const codeExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verificationCode,
        verificationCodeExpires: codeExpiration,
      });
      await newUser.save();

      // Send the verification email
      await sendVerificationEmail(email, verificationCode);

      res.status(201).json({
        message:
          "User registered successfully. Please check your email for verification code.",
      });
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  }
);

//Verify User Email

router.post("/verify-code", async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code." });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    await user.save();
    res.status(200).json({ token, message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      // Check if email is verified
      if (!user.isVerified) {
        return res
          .status(400)
          .json({ message: "Please verify your email before logging in." });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      res.status(200).json({
        message: "Login successful.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  }
);

// Request Password Reset
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Please enter a valid email.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Generate reset token
      const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "10m", // Token valid for 10 minutes
      });

      // Send reset token to user's email
      await sendVerificationEmail(
        email,
        `Your password reset link: <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>`
      );

      res.status(200).json({
        message:
          "Password reset link sent to your email. Please check your inbox.",
      });
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  }
);

// Reset Password
router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Token is required."),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/\d/)
      .withMessage("Password must contain at least one number.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { token, newPassword } = req.body;

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }

      // Find user
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  }
);

// Get authenticated user details (Protected Route)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

module.exports = router;
