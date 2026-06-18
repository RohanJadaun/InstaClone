const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const { image, caption } = req.body;

    const post = await Post.create({
      image,
      caption,
      user: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const posts = await Post.find({
      user: {
        $in: [...currentUser.following, currentUser._id],
      },
    })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({
        message: "Post already liked",
      });
    }

    await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        likes: req.user._id,
      },
    });

    res.status(200).json({
      message: "Post liked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.likes.includes(req.user._id)) {
      return res.status(400).json({
        message: "Post is not liked",
      });
    }

    await Post.findByIdAndUpdate(req.params.id, {
      $pull: {
        likes: req.user._id,
      },
    });

    res.status(200).json({
      message: "Post unliked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();

    res.status(200).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    comment.deleteOne();

    await post.save();

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.params.id,
    })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getFeed,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  deletePost,
  getUserPosts
};