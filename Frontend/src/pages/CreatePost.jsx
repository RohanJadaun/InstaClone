import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createPost } from "../services/postService";
import { uploadImage } from "../services/uploadService";

function CreatePost() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.warning(
        "Please select an image"
      );
      return;
    }

    try {
      setLoading(true);

      toast.info(
        "Uploading image..."
      );

      const uploadResult =
        await uploadImage(image);

      const postData = {
        image: uploadResult.imageUrl,
        caption,
      };

      await createPost(postData);

      toast.success(
        "Post created successfully!"
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Write caption..."
          value={caption}
          onChange={(e) =>
            setCaption(
              e.target.value
            )
          }
          rows="5"
          style={{
            width: "100%",
            padding: "10px",
            border:
              "1px solid #ddd",
            borderRadius: "8px",
            resize: "none",
          }}
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading}
          style={{
            background:
              "#0095f6",
            color: "white",
            border: "none",
            padding:
              "12px 20px",
            borderRadius:
              "8px",
            cursor:
              loading
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading
            ? "Posting..."
            : "Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;