import { useState } from "react";
import { updateProfile } from "../services/userService";

function EditProfile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [username, setUsername] =
  useState(user.username || "");

const [bio, setBio] = useState(
  user.bio || ""
);

  const [profilePic, setProfilePic] =
    useState(user.profilePic || "");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const updatedUser =
      await updateProfile({
        username,
        bio,
        profilePic,
      });

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert(
      "Profile updated successfully"
    );

    window.location.href =
      `/profile/${updatedUser._id}`;
  }
  catch (error) {
  alert(
    error.response?.data?.message ||
    "Something went wrong"
  );
} 

};

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
      }}
    >
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit}>

        <input
  type="text" 
  placeholder="Username"
  value={username}
  onChange={(e) =>
    setUsername(e.target.value)
  }
/>

<br />
<br />





        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePic}
          onChange={(e) =>
            setProfilePic(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;