import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await loginUser(
          formData
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      toast.success(
        "Login successful!"
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(
        error.response?.data
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin:
          "80px auto",
        background:
          "white",
        padding: "30px",
        borderRadius:
          "12px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Login</h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          style={{
            width: "100%",
            padding:
              "10px",
            marginBottom:
              "15px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          style={{
            width: "100%",
            padding:
              "10px",
            marginBottom:
              "15px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background:
              "#0095f6",
            color:
              "white",
            border: "none",
            padding:
              "12px",
            borderRadius:
              "8px",
            cursor:
              loading
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;