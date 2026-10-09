import { Link } from "react-router-dom";
import "./StaffDashboard.css";

function StaffDashboard() {
  return (
    <div className="staff-layout">

      {/* Sidebar */}
      <aside className="staff-sidebar">

        <div className="staff-logo">
          <span>✈</span>
          <strong>BaggageTrack</strong>
        </div>

        <nav className="staff-nav">

          <Link to="/staff" className="staff-nav-item active">
            <span>⌂</span>
            Dashboard
          </Link>

          <Link to="/staff/scan" className="staff-nav-item">
            <span>▣</span>
            Scan Baggage
          </Link>

          <Link to="/staff/baggage" className="staff-nav-item">
            <span>◈</span>
            Baggage
          </Link>

          <Link to="/staff/mismatches" className="staff-nav-item">
            <span>⚠</span>
            Mismatches
          </Link>

          <Link to="/staff/profile" className="staff-nav-item">
            <span>♙</span>
            Profile
          </Link>

        </nav>

        <Link to="/" className="staff-nav-item staff-logout">
          <span>↪</span>
          Logout
        </Link>

      </aside>


      {/* Main Content */}
      <main className="staff-main">

        {/* Header */}
        <header className="staff-header">

          <div>
            <h1>Staff Dashboard</h1>
            <p>Manage and monitor baggage operations.</p>
          </div>

          <div className="staff-user">

            <div className="staff-avatar">
              S
            </div>

            <div>
              <strong>Staff</strong>
              <small>Airline Staff</small>
            </div>

          </div>

        </header>


        {/* Welcome */}
        <section className="staff-welcome">

          <div>
            <span className="staff-label">
              BAGGAGE OPERATIONS
            </span>

            <h2>Welcome back, Staff</h2>

            <p>
              Scan baggage tags, validate flights and update baggage
              status from one place.
            </p>
          </div>

          <Link to="/staff/scan" className="scan-main-btn">
            Scan Baggage →
          </Link>

        </section>


        {/* Statistics */}
        <section className="staff-stats">

          <div className="staff-stat-card">
            <div className="stat-icon blue">▣</div>

            <div>
              <span>Total Baggage</span>
              <strong>2</strong>
            </div>
          </div>


          <div className="staff-stat-card">
            <div className="stat-icon green">✓</div>

            <div>
              <span>Processed Today</span>
              <strong>1</strong>
            </div>
          </div>


          <div className="staff-stat-card">
            <div className="stat-icon orange">◷</div>

            <div>
              <span>Pending</span>
              <strong>1</strong>
            </div>
          </div>


          <div className="staff-stat-card">
            <div className="stat-icon red">⚠</div>

            <div>
              <span>Mismatches</span>
              <strong>1</strong>
            </div>
          </div>

        </section>


        {/* Quick Actions */}
        <section className="staff-section">

          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Common baggage operations</p>
            </div>
          </div>


          <div className="quick-actions">

            <Link to="/staff/scan" className="quick-action-card">

              <div className="quick-icon">
                ▣
              </div>

              <div>
                <h3>Scan Baggage</h3>

                <p>
                  Validate a baggage tag against a flight.
                </p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </Link>


            <Link to="/staff/baggage" className="quick-action-card">

              <div className="quick-icon">
                ◈
              </div>

              <div>
                <h3>View Baggage</h3>

                <p>
                  View baggage records and current status.
                </p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </Link>


            <Link to="/staff/mismatches" className="quick-action-card">

              <div className="quick-icon warning">
                ⚠
              </div>

              <div>
                <h3>Check Mismatches</h3>

                <p>
                  Review baggage and flight mismatches.
                </p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </Link>

          </div>

        </section>


        {/* Current Operation */}
        <section className="staff-section">

          <div className="section-heading">

            <div>
              <h2>Current Operation</h2>
              <p>Recent baggage activity</p>
            </div>

            <Link to="/staff/baggage">
              View All →
            </Link>

          </div>


          <div className="operation-card">

            <div className="operation-left">

              <div className="operation-tag">
                BG-2026-002
              </div>

              <div>
                <strong>AI202</strong>
                <span>Hyderabad → Delhi</span>
              </div>

            </div>


            <div className="operation-status">
              <span className="status-dot"></span>
              Security Screening
            </div>


            <div className="operation-time">
              Recently updated
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StaffDashboard;