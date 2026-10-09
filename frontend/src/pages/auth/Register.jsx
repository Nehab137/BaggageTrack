import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await API.post("/users/register", formData);

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✈️</div>

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>
          Join BaggageTrack as a passenger
        </p>

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        {message && (
          <p style={styles.success}>{message}</p>
        )}

        {error && (
          <p style={styles.error}>{error}</p>
        )}

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span
            style={styles.loginLink}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f2742, #2575c7)",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
  },

  icon: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "10px"
  },

  title: {
    textAlign: "center",
    color: "#123456",
    marginBottom: "8px"
  },

  subtitle: {
    textAlign: "center",
    color: "#718096",
    marginBottom: "28px"
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    fontWeight: "600",
    color: "#243b53"
  },

  input: {
    width: "100%",
    padding: "13px",
    border: "1px solid #d1dce8",
    borderRadius: "9px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    border: "none",
    borderRadius: "9px",
    background: "#1976d2",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  },

  success: {
    textAlign: "center",
    color: "#16a34a",
    marginTop: "18px"
  },

  error: {
    textAlign: "center",
    color: "#dc2626",
    marginTop: "18px"
  },

  loginText: {
    textAlign: "center",
    marginTop: "25px",
    color: "#718096"
  },

  loginLink: {
    color: "#1976d2",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default Register;