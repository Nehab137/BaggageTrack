import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Notifications.css";

function Notifications() {

  // Get logged-in passenger's name
  const userName = localStorage.getItem("name") || "Passenger";
  const userInitial = userName.charAt(0).toUpperCase();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          setError("User information not found. Please login again.");
          return;
        }

        const response = await API.get(
          `/notifications/user/${userId}`
        );

        console.log("Notifications:", response.data);

        setNotifications(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);

        if (error.response) {
          setError(
            `Unable to load notifications. Server returned ${error.response.status}.`
          );
        } else {
          setError(
            "Unable to connect to the server."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    try {
      return new Date(dateValue).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateValue;
    }
  };

  const getNotificationIcon = (notification) => {
    const text = `${notification.title || ""} ${
      notification.message || ""
    }`.toLowerCase();

    if (
      text.includes("security") ||
      text.includes("screening")
    ) {
      return "✓";
    }

    if (
      text.includes("loading") ||
      text.includes("loaded")
    ) {
      return "✈";
    }

    if (
      text.includes("delay") ||
      text.includes("delayed")
    ) {
      return "!";
    }

    if (
      text.includes("lost") ||
      text.includes("mismatch")
    ) {
      return "!";
    }

    return "●";
  };

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
            className="nav-item active"
          >
            <span>♧</span>
            Notifications
          </Link>

          <Link
            to="/passenger/profile"
            className="nav-item"
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
              {userInitial}
            </div>

            <div>
              <strong>{userName}</strong>
              <small>Passenger</small>
            </div>

            <span>⌄</span>

          </div>

        </header>


        {/* PAGE TITLE */}

        <section className="welcome-section">

          <h1>
            Notifications
          </h1>

          <p>
            Stay updated about your baggage journey.
          </p>

        </section>


        {/* NOTIFICATION CARD */}

        <div className="notifications-page-card">

          <div className="notifications-page-header">

            <div>
              <h2>
                Recent Notifications
              </h2>

              <p>
                Updates related to your baggage and flights.
              </p>
            </div>

            <span className="notification-count">
              {notifications.length}
            </span>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="notifications-message">
              Loading notifications...
            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="notifications-error">
              {error}
            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            notifications.length === 0 && (

              <div className="notifications-empty">

                <div className="empty-notification-icon">
                  ♧
                </div>

                <h3>
                  No notifications
                </h3>

                <p>
                  You don't have any baggage updates yet.
                </p>

              </div>

          )}


          {/* NOTIFICATIONS */}

          {!loading &&
            !error &&
            notifications.length > 0 && (

              <div className="notifications-list">

                {notifications.map(
                  (notification, index) => (

                    <div
                      className="notification-row"
                      key={
                        notification.id ||
                        index
                      }
                    >

                      <div className="notification-page-icon">

                        {getNotificationIcon(
                          notification
                        )}

                      </div>


                      <div className="notification-page-content">

                        <div className="notification-title-row">

                          <h3>
                            {notification.title ||
                              "Baggage Update"}
                          </h3>

                          {!notification.read && (
                            <span className="unread-dot"></span>
                          )}

                        </div>


                        <p>
                          {notification.message ||
                            "Your baggage information has been updated."}
                        </p>


                        <small>
                          {formatDate(
                            notification.createdAt ||
                            notification.timestamp
                          )}
                        </small>

                      </div>

                    </div>

                  )
                )}

              </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Notifications;