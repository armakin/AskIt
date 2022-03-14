import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });

    if (user) {
      throw new Error("This email address is already being used.");
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash,
      });

      if (user) {
        res.send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateToken(user.id),
        });
      } else {
        res.status(400);
        throw new Error("Registration failed.");
      }
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Login a new user
// @route   POST /users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Incorrect email or password.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Update profile of logged in user
// @route   PUT /users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      user.email = req.body.email || user.email;
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        user.password = passwordHash;
      }

      const updatedUser = await user.save();

      res.send({
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        token: generateToken(updatedUser.id),
      });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get profile of logged in user
// @route   GET /users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      res.send({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      });
    } else {
      res.status(404);
      throw new Error("Fetching user profile failed.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Delete profile of logged in user
// @route   DELETE /users/profile
// @access  Private
const deleteUserProfile = async (req, res) => {
  try {
    if (req.user) {
      await req.user.destroy();
      res.send({ message: "User profile successfully deleted." });
    } else {
      res.status(400);
      throw new Error("User profile not found.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get list of all users
// @route   GET /users
// @access  Public
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.send(users);
  } catch (e) {
    res.status(404);
    res.send({ error: e.message });
  }
}

export {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  deleteUserProfile,
  getAllUsers,
};
