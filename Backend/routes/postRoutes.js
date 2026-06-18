const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createPost, getFeed, likePost, unlikePost, addComment, deleteComment, deletePost, getUserPosts } = require("../controllers/postController");

const router = express.Router();

router.post("/", protect, createPost);
router.get("/feed", protect, getFeed);
router.put("/like/:id", protect, likePost);
router.put("/unlike/:id", protect, unlikePost);
router.post("/comment/:id", protect, addComment);
router.delete(
  "/comment/:postId/:commentId",
  protect,
  deleteComment
);
router.get("/user/:id", protect, getUserPosts);
router.delete("/:id", protect, deletePost);
module.exports = router;