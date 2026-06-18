import Loader from "../components/Loader";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

import {
  getUserProfile,
  getUserPosts,
  followUser,
  unfollowUser,
} from "../services/userService";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] =
    useState(null);

  const [posts, setPosts] =
    useState([]);

  const [selectedPost, setSelectedPost] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData =
          await getUserProfile(id);

        const postData =
          await getUserPosts(id);

        setUser(userData);
        setPosts(postData);
      } catch (error) {
        toast.error(
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      const alreadyFollowing =
        user.followers.some(
          (follower) =>
            follower._id ===
            currentUser.id
        );

      if (alreadyFollowing) {
        await unfollowUser(id);

        toast.success(
          `Unfollowed ${user.username}`
        );
      } else {
        await followUser(id);

        toast.success(
          `Followed ${user.username}`
        );
      }

      const updatedUser =
        await getUserProfile(id);

      setUser(updatedUser);
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Action failed"
      );
    }
  };

  if (loading) {
  return <Loader />;
}

  if (!user) {
    return (
      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px",
        }}
      >
        User not found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <img
          src={
            user.profilePic ||
            "https://via.placeholder.com/150"
          }
          alt=""
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div>
          <h1>
            {user.username}
          </h1>

          {currentUser.id ===
          user._id ? (
            <button
              onClick={() =>
                navigate(
                  "/edit-profile"
                )
              }
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={
                handleFollow
              }
            >
              {user.followers.some(
                (follower) =>
                  follower._id ===
                  currentUser.id
              )
                ? "Unfollow"
                : "Follow"}
            </button>
          )}

          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "15px",
            }}
          >
            <p>
              <strong>
                {posts.length}
              </strong>{" "}
              posts
            </p>

            <p>
              <strong>
                {
                  user.followers
                    .length
                }
              </strong>{" "}
              followers
            </p>

            <p>
              <strong>
                {
                  user.following
                    .length
                }
              </strong>{" "}
              following
            </p>
          </div>

          <p>
            {user.bio ||
              "No bio yet"}
          </p>
        </div>
      </div>

      <hr />

      <h2>Posts</h2>

      {posts.length === 0 && (
        <div
          style={{
            background:
              "white",
            padding: "30px",
            borderRadius:
              "12px",
            textAlign:
              "center",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>
            No posts yet
          </h3>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {posts.map((post) => (
          <img
            key={post._id}
            src={post.image}
            alt={post.caption}
            onClick={() =>
              setSelectedPost(post)
            }
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {selectedPost && (
        <div
          onClick={() =>
            setSelectedPost(null)
          }
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              background:
                "white",
              padding: "20px",
              maxWidth:
                "800px",
              width: "90%",
              borderRadius:
                "10px",
            }}
          >
            <img
              src={
                selectedPost.image
              }
              alt=""
              style={{
                width: "100%",
                maxHeight:
                  "500px",
                objectFit:
                  "contain",
              }}
            />

            <h3>
              {
                selectedPost.caption
              }
            </h3>

            <p>
              ❤️ Likes:{" "}
              {
                selectedPost
                  .likes.length
              }
            </p>

            <h4>
              Comments
            </h4>

            {selectedPost
              .comments
              ?.length ===
              0 && (
              <p>
                No comments
                yet
              </p>
            )}

            {selectedPost.comments?.map(
              (
                comment
              ) => (
                <div
                  key={
                    comment._id
                  }
                >
                  <strong>
                    {
                      comment
                        .user
                        ?.username
                    }
                  </strong>
                  :{" "}
                  {
                    comment.text
                  }
                </div>
              )
            )}

            <button
              onClick={() =>
                setSelectedPost(
                  null
                )
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;