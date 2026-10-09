import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Send email and password to backend
      const response = await API.post("/auth/login", {
        email: email.trim(),
        password: password,
      });

      const data = response.data;

      console.log("Login response:", data);

      // Get role returned by backend
      const userRole = data.role?.toUpperCase();

      // Make sure backend returned a role
      if (!userRole) {
        setError("User role was not returned by the server.");
        setLoading(false);
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", userRole);

      // =========================================
      // AUTOMATIC REDIRECTION BASED ON ROLE
      // =========================================

      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "STAFF") {
        navigate("/staff");
      } else if (userRole === "PASSENGER") {
        navigate("/passenger");
      } else {
        setError("Invalid user role.");
        localStorage.clear();
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response) {
        const responseData = error.response.data;

        if (typeof responseData === "string") {
          setError(responseData);
        } else {
          setError(
            responseData?.message ||
            "Invalid email or password."
          );
        }
      } else if (error.request) {
        setError(
          "Cannot connect to the server. Please make sure Spring Boot is running."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-overlay"></div>

      <div className="login-container">

        {/* =================================
            LOGO
        ================================= */}

        <div className="login-logo">
          <span>✈</span>
          <strong>BaggageTrack</strong>
        </div>


        {/* =================================
            LOGIN CARD
        ================================= */}

        <div className="login-card">

          <h1>
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Login to your BaggageTrack account
          </p>


          <form onSubmit={handleLogin}>

            {/* =================================
                EMAIL
            ================================= */}

            <div className="form-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

            </div>


            {/* =================================
                PASSWORD
            ================================= */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

            </div>


            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            {/* =================================
                LOGIN BUTTON
            ================================= */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>


          {/* =================================
              REGISTER
          ================================= */}

          <p className="register-text">

            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>

          </p>


          {/* =================================
              BACK TO HOME
          ================================= */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;