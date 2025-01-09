import express from "express";
import { check } from "express-validator";


import {
  getProfile,
  createOrUpdateProfile,
  getAllUsers,
  getUSerById,
  deleteUserProfileAndPosts,
  addExperience,
  deleteExperienceFromUser,
  deleteEducation,
  updateEducation,
  GwtUSerReposFromGithub
} from "../constollers/profile.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();


router.get("/me", auth, getProfile);
router.post("/", getAllUsers);
router.delete("/", auth, deleteUserProfileAndPosts);
router.post("/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
  createOrUpdateProfile
);
router.put(
  "/experience",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From data is required").not().isEmpty(),
  ],
  addExperience
);

router.put(
  "/education",
  auth,
  [
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Fieldofstudy data is required").not().isEmpty(),
  ],
  updateEducation
);

router.delete("/experience/:exp_id", auth, deleteExperienceFromUser);
router.delete("/education/:edu_id", auth, deleteEducation);
router.get("/:user_id", getUSerById);
router.get("/github/:username", GwtUSerReposFromGithub);

export default router;
