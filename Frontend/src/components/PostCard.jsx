import {
  FaHeart,
  FaRegHeart,
  FaComment,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

import "../styles/PostCard.css";

function PostCard({
  post,
  user,
  handleLike,
  handleDeletePost,
  handleComment,
  handleDeleteComment,
}) {
  const [text, setText] = useState("");

  return (
    <div className="post-card">
      <div className="post-header">
        <Link
          to={`/profile/${post.user._id}`}
          className="post-user-link"
        >
          <img
            src={
              post.user.profilePic ||
              "https://via.placeholder.com/40"
            }
            alt=""
            className="post-avatar"
          />

          <strong>
            {post.user.username}
          </strong>
        </Link>
      </div>

      <img
        src={post.image}
        alt={post.caption}
        className="post-image"
      />

      <div className="post-actions">
        <span
          className="action-icon"
          onClick={() =>
            handleLike(post)
          }
        >
          {post.likes.includes(
            user.id
          ) ? (
            <FaHeart color="red" />
          ) : (
            <FaRegHeart />
          )}
        </span>

        <FaComment />
      </div>

      <p className="likes-count">
        {post.likes.length} likes
      </p>

      <p className="post-caption">
        <strong>
          {post.user.username}
        </strong>{" "}
        {post.caption}
      </p>

      <div className="comments-section">
        {post.comments.map(
          (comment) => (
            <div
              key={
                comment._id
              }
              className="comment-row"
            >
              <span>
                <strong>
                  {
                    comment.user
                      ?.username
                  }
                </strong>{" "}
                {comment.text}
              </span>

              {(comment.user
                ?._id ===
                user.id ||
                post.user._id ===
                  user.id) && (
                <button
                  className="comment-delete"
                  onClick={() =>
                    handleDeleteComment(
                      post._id,
                      comment._id
                    )
                  }
                >
                  Delete
                </button>
              )}
            </div>
          )
        )}
      </div>

      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          className="comment-input"
        />

        <button
          onClick={() => {
            handleComment(
              post._id,
              text
            );

            setText("");
          }}
        >
          Post
        </button>
      </div>

      {post.user._id ===
        user.id && (
        <button
          className="delete-post-btn"
          onClick={() =>
            handleDeletePost(
              post._id
            )
          }
        >
          Delete Post
        </button>
      )}
    </div>
  );
}

export default PostCard;