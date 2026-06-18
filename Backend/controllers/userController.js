const User = require("../models/User");

const followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    if (req.user.following.includes(req.params.id)) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        following: req.params.id,
      },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $push: {
        followers: req.user._id,
      },
    });

    res.status(200).json({
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unFollowUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "You cannot unfollow yourself",
      });
    }

    if (!req.user.following.includes(req.params.id)) {
      return res.status(400).json({
        message: "You are not following this user",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        following: req.params.id,
      },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $pull: {
        followers: req.user._id,
      },
    });

    res.status(200).json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "username profilePic")
      .populate("following", "username profilePic");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, bio, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        bio,
        profilePic,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const query = req.query.query;

    const users = await User.find({
      username: {
        $regex: query,
        $options: "i",
      },
    })
      .select(
        "_id username profilePic"
      )
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSuggestedUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find({
      _id: {
        $nin: [
          req.user._id,
          ...req.user.following,
        ],
      },
    })
      .select(
        "_id username profilePic"
      )
      .limit(5);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  followUser,
  unFollowUser,
  getUserProfile,
  updateProfile,
  searchUsers,
  getSuggestedUsers,
};