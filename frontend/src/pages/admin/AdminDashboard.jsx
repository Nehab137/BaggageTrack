import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFlights: 0,
    totalBaggage: 0,
    totalMismatches: 0,
    openMismatches: 0,
    resolvedMismatches: 0,
    checkIn: 0,
    securityScreening: 0,
    loading: 0,
    inTransit: 0,
    arrival: 0,
    delayed: 0,
    lost: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await API.get("/admin/statistics");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching admin statistics:", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-page">

      {/* TOP NAVBAR */}
      <nav className="admin-navbar">
        <div className="logo">
          🧳 BaggageTrack
        </div>

        <div className="admin-user">
          👤 Admin
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="admin-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <h2>Admin Panel</h2>

          <button
            className="side-button active"
            onClick={() => navigate("/admin")}
          >
            📊 Dashboard
          </button>

          <button
            className="side-button"
            onClick={() => navigate("/admin/users")}
          >
            👥 Users
          </button>

          <button
            className="side-button"
            onClick={() => navigate("/admin/flights")}
          >
            ✈️ Flights
          </button>

          <button
            className="side-button"
            onClick={() => navigate("/admin/baggage")}
          >
            🧳 Baggage
          </button>

          <button
            className="side-button"
            onClick={() => navigate("/admin/mismatches")}
          >
            ⚠️ Mismatches
          </button>

          <div className="sidebar-bottom">
            <button
              className="side-button logout-side"
              onClick={logout}
            >
              🚪 Logout
            </button>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="admin-content">

          <h1>Admin Dashboard</h1>

          <p className="welcome">
            Welcome to the BaggageTrack Administration Panel
          </p>

          {/* MAIN STATISTICS */}
          <div className="stats-grid">

            <div
              className="stat-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="stat-icon">👥</div>
              <div>
                <h3>Users</h3>
                <strong>{stats.totalUsers}</strong>
                <p>Registered users</p>
              </div>
            </div>

            <div
              className="stat-card"
              onClick={() => navigate("/admin/flights")}
            >
              <div className="stat-icon">✈️</div>
              <div>
                <h3>Flights</h3>
                <strong>{stats.totalFlights}</strong>
                <p>Total flights</p>
              </div>
            </div>

            <div
              className="stat-card"
              onClick={() => navigate("/admin/baggage")}
            >
              <div className="stat-icon">🧳</div>
              <div>
                <h3>Baggage</h3>
                <strong>{stats.totalBaggage}</strong>
                <p>Total baggage</p>
              </div>
            </div>

            <div
              className="stat-card"
              onClick={() => navigate("/admin/mismatches")}
            >
              <div className="stat-icon">⚠️</div>
              <div>
                <h3>Mismatches</h3>
                <strong>{stats.totalMismatches}</strong>
                <p>Detected mismatches</p>
              </div>
            </div>

          </div>

          {/* BAGGAGE STATUS */}
          <section className="section">
            <h2>Baggage Status Overview</h2>

            <div className="status-grid">

              <div className="status-card">
                <span>✅</span>
                <h3>Check-in</h3>
                <strong>{stats.checkIn}</strong>
              </div>

              <div className="status-card">
                <span>🔍</span>
                <h3>Security Screening</h3>
                <strong>{stats.securityScreening}</strong>
              </div>

              <div className="status-card">
                <span>📦</span>
                <h3>Loading</h3>
                <strong>{stats.loading}</strong>
              </div>

              <div className="status-card">
                <span>✈️</span>
                <h3>In Transit</h3>
                <strong>{stats.inTransit}</strong>
              </div>

              <div className="status-card">
                <span>🏁</span>
                <h3>Arrival</h3>
                <strong>{stats.arrival}</strong>
              </div>

              <div className="status-card delayed">
                <span>🟠</span>
                <h3>Delayed</h3>
                <strong>{stats.delayed}</strong>
              </div>

              <div className="status-card lost">
                <span>🔴</span>
                <h3>Lost</h3>
                <strong>{stats.lost}</strong>
              </div>

            </div>
          </section>

          {/* MISMATCH OVERVIEW */}
          <section className="section">
            <h2>Mismatch Overview</h2>

            <div className="mismatch-grid">

              <div className="mismatch-card">
                <h3>Total</h3>
                <strong>{stats.totalMismatches}</strong>
              </div>

              <div className="mismatch-card open">
                <h3>Open</h3>
                <strong>{stats.openMismatches}</strong>
              </div>

              <div className="mismatch-card resolved">
                <h3>Resolved</h3>
                <strong>{stats.resolvedMismatches}</strong>
              </div>

            </div>
          </section>

        </main>
      </div>

      {/* STYLES */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .admin-page {
          min-height: 100vh;
          background: #f4f7fb;
          font-family: Arial, sans-serif;
          color: #102a43;
        }

        .admin-navbar {
          height: 70px;
          background: linear-gradient(
            135deg,
            #0f3d63,
            #2563eb,
            #6d28d9
          );
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .admin-user button {
          border: none;
          padding: 9px 18px;
          border-radius: 8px;
          background: white;
          color: #2563eb;
          font-weight: bold;
          cursor: pointer;
        }

        .admin-layout {
          display: flex;
          min-height: calc(100vh - 70px);
        }

        .sidebar {
          width: 230px;
          background: #ffffff;
          padding: 25px 15px;
          box-shadow: 3px 0 12px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }

        .sidebar h2 {
          margin: 0 10px 25px;
          font-size: 20px;
        }

        .side-button {
          border: none;
          background: transparent;
          padding: 14px 15px;
          margin-bottom: 8px;
          border-radius: 10px;
          text-align: left;
          font-size: 15px;
          font-weight: bold;
          color: #334e68;
          cursor: pointer;
          transition: 0.2s;
        }

        .side-button:hover {
          background: #eef4ff;
          color: #2563eb;
        }

        .side-button.active {
          background: #e8efff;
          color: #2563eb;
        }

        .sidebar-bottom {
          margin-top: auto;
        }

        .logout-side {
          color: #dc2626;
        }

        .admin-content {
          flex: 1;
          padding: 35px;
          max-width: 1250px;
        }

        .admin-content h1 {
          margin: 0 0 5px;
          font-size: 36px;
        }

        .welcome {
          color: #64748b;
          font-size: 17px;
          margin-bottom: 30px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: white;
          padding: 23px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 5px 18px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-icon {
          font-size: 38px;
        }

        .stat-card h3 {
          margin: 0 0 5px;
          font-size: 18px;
        }

        .stat-card strong {
          display: block;
          font-size: 28px;
          color: #2563eb;
        }

        .stat-card p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 14px;
        }

        .section {
          margin-top: 40px;
        }

        .section h2 {
          margin-bottom: 20px;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .status-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 5px 18px rgba(0,0,0,0.07);
        }

        .status-card span {
          font-size: 30px;
        }

        .status-card h3 {
          font-size: 16px;
          margin: 10px 0;
        }

        .status-card strong {
          font-size: 28px;
        }

        .delayed strong {
          color: #d97706;
        }

        .lost strong {
          color: #dc2626;
        }

        .mismatch-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .mismatch-card {
          background: white;
          padding: 25px;
          text-align: center;
          border-radius: 14px;
          box-shadow: 0 5px 18px rgba(0,0,0,0.07);
        }

        .mismatch-card h3 {
          margin: 0 0 10px;
        }

        .mismatch-card strong {
          font-size: 32px;
        }

        .open strong {
          color: #dc2626;
        }

        .resolved strong {
          color: #16a34a;
        }

        @media (max-width: 1000px) {
          .stats-grid,
          .status-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .sidebar {
            width: 70px;
            padding: 15px 8px;
          }

          .sidebar h2 {
            display: none;
          }

          .side-button {
            font-size: 0;
            text-align: center;
          }

          .side-button::first-letter {
            font-size: 20px;
          }

          .admin-content {
            padding: 20px;
          }

          .stats-grid,
          .status-grid,
          .mismatch-grid {
            grid-template-columns: 1fr;
          }

          .logo {
            font-size: 18px;
          }
        }

      `}</style>

    </div>
  );
}

export default AdminDashboard;