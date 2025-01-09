import express from "express";

import { auth } from "../middleware/auth.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unLikePost,
} from "../constollers/posts.js";
import { check } from "express-validator";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  createPost
);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], deletePost);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), getPostById);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, getAllPosts);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/like/:id", auth, checkObjectId('id'), likePost);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", auth, checkObjectId('id'), unLikePost);
export default router;
