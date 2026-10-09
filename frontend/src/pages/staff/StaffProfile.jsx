import { Link } from "react-router-dom";
import "./Mismatches.css";
import "./StaffProfile.css";

function StaffProfile() {
  const userName = localStorage.getItem("name") || "Test Staff";
  const userEmail = localStorage.getItem("email") || "staff@test.com";
  const userRole = localStorage.getItem("role") || "STAFF";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="staff-layout">

      {/* =========================
          SIDEBAR
      ========================== */}

      <aside className="staff-sidebar">

        <div className="staff-logo">
          <span>✈</span>
          <strong>BaggageTrack</strong>
        </div>


        <nav className="staff-nav">

          <Link
            to="/staff"
            className="staff-nav-item"
          >
            <span>⌂</span>
            Dashboard
          </Link>


          <Link
            to="/staff/scan"
            className="staff-nav-item"
          >
            <span>▣</span>
            Scan Baggage
          </Link>


          <Link
            to="/staff/update-status"
            className="staff-nav-item"
          >
            <span>↻</span>
            Update Status
          </Link>


          <Link
            to="/staff/baggage"
            className="staff-nav-item"
          >
            <span>◈</span>
            Baggage
          </Link>


          <Link
            to="/staff/mismatches"
            className="staff-nav-item"
          >
            <span>⚠</span>
            Mismatches
          </Link>


          <Link
            to="/staff/profile"
            className="staff-nav-item active"
          >
            <span>♙</span>
            Profile
          </Link>

        </nav>


        <Link
          to="/"
          className="staff-nav-item staff-logout"
        >
          <span>↪</span>
          Logout
        </Link>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="staff-main">

        {/* HEADER */}

        <header className="staff-header">

          <div>

            <h1>
              My Profile
            </h1>

            <p>
              View your BaggageTrack staff account information.
            </p>

          </div>


          {/* TOP RIGHT USER */}

          <div className="staff-user">

            <div className="staff-avatar">
              {userInitial}
            </div>

            <div>

              <strong>
                {userName}
              </strong>

              <small>
                Airline Staff
              </small>

            </div>

          </div>

        </header>


        {/* =========================
            PROFILE CARD
        ========================== */}

        <section className="staff-profile-card">

          {/* PROFILE HEADER */}

          <div className="staff-profile-top">

            <div className="staff-profile-avatar">
              {userInitial}
            </div>


            <div className="staff-profile-name">

              <h2>
                {userName}
              </h2>

              <p>
                Airline Staff
              </p>

            </div>

          </div>


          {/* DIVIDER */}

          <div className="staff-profile-divider"></div>


          {/* DETAILS */}

          <div className="staff-profile-grid">

            <div className="staff-profile-item">

              <span>
                Full Name
              </span>

              <strong>
                {userName}
              </strong>

            </div>


            <div className="staff-profile-item">

              <span>
                Email Address
              </span>

              <strong>
                {userEmail}
              </strong>

            </div>


            <div className="staff-profile-item">

              <span>
                Account Role
              </span>

              <strong>
                {userRole === "STAFF" ? "Staff" : userRole}
              </strong>

            </div>


            <div className="staff-profile-item">

              <span>
                Account Status
              </span>

              <strong className="staff-profile-status">
                Active
              </strong>

            </div>

          </div>


          {/* INFORMATION BOX */}

          <div className="staff-profile-info">

            <div className="staff-profile-info-icon">
              ✓
            </div>

            <div>

              <strong>
                Account Information
              </strong>

              <p>
                Your staff profile is securely associated with
                your BaggageTrack account.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StaffProfile;