import { check } from "express-validator";
import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";

import { getUser, createUser, loginUser } from "../controllers/auth.js";

router
  .route("/")
  .get(auth, auth, getUser)
  .post(
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    createUser
  );

router
  .route("/login")
  .post(
    [
      check("email", "Please include a valid email").isEmail(),
      check("password", "Password is required").exists(),
    ],
    loginUser
  );

export default router;
