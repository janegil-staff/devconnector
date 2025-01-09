import express from "express";
import { check } from "express-validator";
import {
  getProfile,
  createOrUpdateProfile,
  getAllUsers,
  getUSerById,
  deleteUserProfileAndPosts,
} from "../controllers/profile.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

// @route GET   api/profile
// @desc        Test route
// @access      Public
router.delete("/", auth, deleteUserProfileAndPosts)
router.get("/me", auth, getProfile);

router
  .route("/")
  .get(getAllUsers)
  .post(
    auth,
    check("status", "Status is required").notEmpty(),
    check("skills", "Skills is required").notEmpty(),
    createOrUpdateProfile
  );

router.get("/:user_id", getUSerById);

export default router;
