import User from "../models/users.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const user = await User.create({ name, email, password, type });
    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user.", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { type, email } = req.query;

    const filters = {};
    if (type) filters.type = type;
    if (email) filters.email = email;

    const users = await User.find(filters).select("-password");
    res.status(200).json({ message: "Users retrieved successfully.", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users.", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User retrieved successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user.", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      return res.status(400).json({ message: "Password updates not allowed here." });
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user.", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user.", error: error.message });
  }
};

import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during authentication.", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error changing password.", error: error.message });
  }
};
