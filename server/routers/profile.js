import express from "express";
import { check } from "express-validator";
import { auth } from "../middleware/auth.js";

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

const router = express.Router();

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, getProfile);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.post("/", getAllUsers);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, deleteUserProfileAndPosts);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post("/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
  createOrUpdateProfile
);

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
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

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
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

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete("/experience/:exp_id", auth, deleteExperienceFromUser);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/education/:edu_id", auth, deleteEducation);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", getUSerById);

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", GwtUSerReposFromGithub);


export default router;
