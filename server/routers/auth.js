import { check } from "express-validator";
import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";
import {getUser, loginUser } from "../constollers/auth.js";

// @route    GET api/auth
// @desc     Get user by token
// @access   Privat
router.get("/", auth, getUser);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);



export default router;
