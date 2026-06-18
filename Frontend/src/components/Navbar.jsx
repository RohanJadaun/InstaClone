import { Link } from "react-router-dom";
import { useState } from "react";

import { searchUsers } from "../services/userService";

import "../styles/Navbar.css";

function Navbar() {
  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || null;

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState([]);

  const handleSearch = async (
    value
  ) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const users =
        await searchUsers(value);

      setResults(users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href =
      "/login";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link
          to="/"
          className="logo-link"
        >
          InstaClone
        </Link>
      </h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) =>
            handleSearch(
              e.target.value
            )
          }
        />

        {results.length > 0 && (
          <div className="search-results">
            {results.map(
              (userResult) => (
                <Link
                  key={
                    userResult._id
                  }
                  to={`/profile/${userResult._id}`}
                  className="search-user"
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <img
                    src={
                      userResult.profilePic ||
                      "https://via.placeholder.com/40"
                    }
                    alt=""
                    className="search-avatar"
                  />

                  <span>
                    {
                      userResult.username
                    }
                  </span>
                </Link>
              )
            )}
          </div>
        )}
      </div>

      <div className="nav-links">
        <Link to="/">
          Home
        </Link>

        {user && (
          <>
            <Link to="/create">
              Create Post
            </Link>

            <Link
              to={`/profile/${user.id}`}
            >
              My Profile
            </Link>

            <button
              onClick={
                handleLogout
              }
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;