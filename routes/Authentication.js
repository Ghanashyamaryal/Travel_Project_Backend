import express from "express";
import Authentication from "../controller/Authentication.controller.js";
import { verifyToken, verifyRole } from "../middleware/jwtmiddleware.js"
const router = express.Router();

//public route
router.post("/login", Authentication);

// Protected route for admin
router.get(
  "/admin",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => res.status(200).json({ message: "Welcome, Admin!" })
);

// Protected route for users
router.get(
  "/user",
  verifyToken,
  verifyRole(["user"]),
  (req, res) => res.status(200).json({ message: "Welcome, User!" })
);

export default router;

