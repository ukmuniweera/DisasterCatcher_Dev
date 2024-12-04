import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    let user = null;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decodedToken.userId);
      if (!user) throw new Error("Invalid token or user not found");
    } else {
      if (!req.session.pseudoUser) {
        req.session.pseudoUser = {
          id: `anon_${Date.now()}`,
          userType: "anonymous",
          location: req.body.location || null,
        };
      }
      user = req.session.pseudoUser;
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Not authorized." });
  }
};

export const verifyUserType = (allowedTypes) => {
  return (req, res, next) => {
    if (!req.user || !allowedTypes.includes(req.user.userType)) {
      return res.status(403).json({
        status: false,
        message: "Access denied. Insufficient permissions.",
      });
    }
    next();
  };
};


export const verifyVerifiedUser = async (req, res, next) => {
  try {
    if (!req.user?.isVerified) {
      return res.status(403).json({
        status: false,
        message: "Access denied. This action requires a verified user.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user?.userType !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Access denied. Admin privileges are required.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
