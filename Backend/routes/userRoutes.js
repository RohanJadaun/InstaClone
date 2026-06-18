const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  followUser,
  unFollowUser,
  getUserProfile,
  updateProfile,
  searchUsers,
  getSuggestedUsers,
} = require("../controllers/userController");

const router = express.Router();

router.put(
  "/follow/:id",
  protect,
  followUser
);

router.put(
  "/unfollow/:id",
  protect,
  unFollowUser
);

router.get(
  "/profile/:id",
  protect,
  getUserProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.get(
  "/search",
  protect,
  searchUsers
);

router.get(
  "/suggested",
  protect,
  getSuggestedUsers
);

module.exports = router;