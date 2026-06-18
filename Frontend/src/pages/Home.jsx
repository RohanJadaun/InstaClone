import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import "../styles/Home.css";

import {
  getFeed,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  deletePost,
} from "../services/postService";

import {
  getSuggestedUsers,
} from "../services/userService";

import PostCard from "../components/PostCard";

function Home() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [posts, setPosts] =
    useState([]);

  const [suggestedUsers, setSuggestedUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedData =
          await getFeed();

        const suggestedData =
          await getSuggestedUsers();

        setPosts(feedData);
        setSuggestedUsers(
          suggestedData
        );
      } catch (error) {
        toast.error(
          "Failed to load feed"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshFeed =
    async () => {
      const updatedFeed =
        await getFeed();

      setPosts(updatedFeed);
    };

  const handleLike =
    async (post) => {
      try {
        const alreadyLiked =
          post.likes.includes(
            user.id
          );

        if (alreadyLiked) {
          await unlikePost(
            post._id
          );
        } else {
          await likePost(
            post._id
          );
        }

        await refreshFeed();
      } catch (error) {
        toast.error(
          "Failed to update like"
        );
      }
    };

  const handleComment =
    async (
      postId,
      text
    ) => {
      try {
        if (!text) {
          toast.warning(
            "Please enter a comment"
          );
          return;
        }

        await addComment(
          postId,
          text
        );

        toast.success(
          "Comment added"
        );

        await refreshFeed();
      } catch (error) {
        toast.error(
          "Failed to add comment"
        );
      }
    };

  const handleDeleteComment =
    async (
      postId,
      commentId
    ) => {
      try {
        await deleteComment(
          postId,
          commentId
        );

        toast.success(
          "Comment deleted"
        );

        await refreshFeed();
      } catch (error) {
        toast.error(
          "Failed to delete comment"
        );
      }
    };

  const handleDeletePost =
    async (postId) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this post?"
        );

      if (!confirmed) return;

      try {
        await deletePost(
          postId
        );

        toast.success(
          "Post deleted"
        );

        await refreshFeed();
      } catch (error) {
        toast.error(
          "Failed to delete post"
        );
      }
    };

  if (loading) {
  return <Loader />;
}

  return (
    <div className="home-container">
      <div className="feed-section">
        <h1>
          Welcome{" "}
          {
            user?.username
          }
        </h1>

        {posts.length ===
          0 && (
          <div className="empty-state">
            <h3>
              No posts yet
            </h3>

            <p>
              Follow users or
              create your first
              post.
            </p>
          </div>
        )}

        {posts.map(
          (post) => (
            <PostCard
              key={
                post._id
              }
              post={post}
              user={user}
              handleLike={
                handleLike
              }
              handleComment={
                handleComment
              }
              handleDeleteComment={
                handleDeleteComment
              }
              handleDeletePost={
                handleDeletePost
              }
            />
          )
        )}
      </div>

      <div className="suggested-section">
        <h3>
          Suggested Users
        </h3>

        {suggestedUsers.length ===
          0 && (
          <p>
            No suggestions
            available.
          </p>
        )}

        {suggestedUsers.map(
          (
            suggestedUser
          ) => (
            <div
              key={
                suggestedUser._id
              }
              className="suggested-user"
            >
              <img
                src={
                  suggestedUser.profilePic ||
                  "https://via.placeholder.com/40"
                }
                alt=""
                className="suggested-avatar"
              />

              <Link
                to={`/profile/${suggestedUser._id}`}
              >
                {
                  suggestedUser.username
                }
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;