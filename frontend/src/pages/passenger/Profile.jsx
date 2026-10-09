import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name") || "Passenger");
    setEmail(localStorage.getItem("email") || "");
    setRole(localStorage.getItem("role") || "PASSENGER");
  }, []);

  const displayRole =
    role === "PASSENGER"
      ? "Passenger"
      : role === "STAFF"
      ? "Staff"
      : role === "ADMIN"
      ? "Administrator"
      : role;

  const initial = name
    ? name.charAt(0).toUpperCase()
    : "P";

  return (
    <div className="passenger-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          <span>✈</span>
          <strong>BaggageTrack</strong>
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/passenger"
            className="nav-item"
          >
            <span>⌂</span>
            Dashboard
          </Link>

          <Link
            to="/passenger/baggage"
            className="nav-item"
          >
            <span>▣</span>
            My Baggage
          </Link>

          <Link
            to="/passenger/track"
            className="nav-item"
          >
            <span>⌕</span>
            Track Baggage
          </Link>

          <Link
            to="/passenger/notifications"
            className="nav-item"
          >
            <span>♧</span>
            Notifications
          </Link>

          <Link
            to="/passenger/profile"
            className="nav-item active"
          >
            <span>♙</span>
            Profile
          </Link>

        </nav>

        <Link
          to="/"
          className="nav-item logout"
        >
          <span>↪</span>
          Logout
        </Link>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          <div></div>

          <div className="user-info">

            <div className="user-avatar">
              {initial}
            </div>

            <div>
              <strong>{name}</strong>
              <small>{displayRole}</small>
            </div>

            <span>⌄</span>

          </div>

        </header>


        {/* PAGE TITLE */}

        <section className="welcome-section">

          <h1>
            My Profile
          </h1>

          <p>
            View your BaggageTrack account information.
          </p>

        </section>


        {/* PROFILE CARD */}

        <div className="profile-card">

          {/* PROFILE HEADER */}

          <div className="profile-header">

            <div className="profile-avatar">
              {initial}
            </div>

            <div className="profile-heading">

              <h2>
                {name}
              </h2>

              <p>
                {displayRole}
              </p>

            </div>

          </div>


          {/* PROFILE INFORMATION */}

          <div className="profile-info">

            <div className="profile-info-item">

              <span>
                Full Name
              </span>

              <strong>
                {name}
              </strong>

            </div>


            <div className="profile-info-item">

              <span>
                Email Address
              </span>

              <strong>
                {email}
              </strong>

            </div>


            <div className="profile-info-item">

              <span>
                Account Role
              </span>

              <strong>
                {displayRole}
              </strong>

            </div>


            <div className="profile-info-item">

              <span>
                Account Status
              </span>

              <strong className="profile-status">
                Active
              </strong>

            </div>

          </div>


          {/* ACCOUNT INFORMATION */}

          <div className="profile-note">

            <div className="profile-note-icon">
              ✓
            </div>

            <div>

              <strong>
                Account Information
              </strong>

              <p>
                Your profile information is securely
                associated with your BaggageTrack account.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;