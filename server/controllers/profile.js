import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { Result, validationResult } from "express-validator";

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id).populate("User", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.json({ msg: err.message });
  }
};

// @route       POST api/profile
// @desc        Create or Update user profile
// @access      Private
const createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  // build social object
  profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route       GET api/profile
// @desc        GEt all profiles
// @access      Public
const getAllUsers = async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("User", [
      "name",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getUSerById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("User", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "tProfile not foundr" });

    res.json(profile);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not foundr" });
    }
    res.status(500).send("Server error");
  }
};

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
const deleteUserProfileAndPosts = async (req, res) => {
  try {
    await Profile.deleteOne({ user: req.user.id }),
      await User.deleteOne({ _id: req.user.id }),
      res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export {
  getProfile,
  createOrUpdateProfile,
  getAllUsers,
  getUSerById,
  deleteUserProfileAndPosts,
};
