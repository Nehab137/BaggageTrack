import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

function PassengerDashboard() {

  // ==========================================
  // LOGGED-IN USER
  // ==========================================

  const userName =
    localStorage.getItem("name") || "Passenger";

  const userInitial =
    userName.charAt(0).toUpperCase();

  const userId =
    localStorage.getItem("userId") ||
    localStorage.getItem("id");

  const navigate = useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [baggage, setBaggage] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Flight dropdown
  const [showFlightDetails, setShowFlightDetails] =
    useState(false);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    // Remove login session
    localStorage.clear();

    // Go to login page
    navigate("/login");
  };


  // ==========================================
  // FETCH PASSENGER DATA
  // ==========================================

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        setLoading(true);

        // Get only logged-in passenger's baggage
        const baggageResponse =
          await API.get("/baggage/my");

        const baggageData =
          Array.isArray(baggageResponse.data)
            ? baggageResponse.data
            : [];

        setBaggage(baggageData);


        // Get notifications
        if (userId) {

          try {

            const notificationResponse =
              await API.get(
                `/notifications/user/${userId}`
              );

            const notificationData =
              Array.isArray(
                notificationResponse.data
              )
                ? notificationResponse.data
                : [];

            setNotifications(
              notificationData
            );

          } catch (notificationError) {

            console.error(
              "Notification error:",
              notificationError
            );

            setNotifications([]);

          }

        } else {

          setNotifications([]);

        }

      } catch (error) {

        console.error(
          "Dashboard error:",
          error
        );

        setBaggage([]);
        setNotifications([]);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboardData();

  }, [userId]);


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalBaggage =
    baggage.length;

  const inTransitCount =
    baggage.filter(
      (item) =>
        item.status === "IN_TRANSIT"
    ).length;

  const delayedCount =
    baggage.filter(
      (item) =>
        item.status === "DELAYED"
    ).length;

  const lostCount =
    baggage.filter(
      (item) =>
        item.status === "LOST"
    ).length;


  // ==========================================
  // DATE FORMATTER
  // ==========================================

  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };


  // ==========================================
  // TIME FORMATTER
  // ==========================================

  const formatTime = (dateValue) => {

    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }
    );
  };


  // ==========================================
  // UPCOMING FLIGHT
  // ==========================================

  const upcomingBaggage =
    baggage.length > 0
      ? baggage.find(
          (item) => item.flight
        ) || baggage[0]
      : null;

  const upcomingFlight =
    upcomingBaggage?.flight || null;


  // ==========================================
  // NOTIFICATION HELPERS
  // ==========================================

  const getNotificationTitle = (
    notification
  ) => {

    return (
      notification.title ||
      notification.subject ||
      "Baggage Update"
    );
  };


  const getNotificationMessage = (
    notification
  ) => {

    return (
      notification.message ||
      notification.description ||
      "Your baggage information has been updated."
    );
  };


  const getNotificationTime = (
    notification
  ) => {

    return (
      notification.createdAt ||
      notification.timestamp ||
      notification.time ||
      notification.updatedAt
    );
  };


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="passenger-layout">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="sidebar-logo">

            <span>
              ✈
            </span>

            <strong>
              BaggageTrack
            </strong>

          </div>


          <nav className="sidebar-nav">

            <Link
              to="/passenger"
              className="nav-item active"
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
              className="nav-item"
            >
              <span>♙</span>
              Profile
            </Link>

          </nav>


          <button
            type="button"
            className="nav-item logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </aside>


        {/* MAIN */}

        <main className="dashboard-main">

          <section className="welcome-section">

            <h1>
              Good evening, {userName}
            </h1>

            <p>
              Loading your baggage information...
            </p>

          </section>

        </main>

      </div>
    );
  }


  // ==========================================
  // MAIN DASHBOARD
  // ==========================================

  return (

    <div className="passenger-layout">


      {/* ======================================
          SIDEBAR
      ======================================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <span>
            ✈
          </span>

          <strong>
            BaggageTrack
          </strong>

        </div>


        <nav className="sidebar-nav">

          <Link
            to="/passenger"
            className="nav-item active"
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
            className="nav-item"
          >
            <span>♙</span>
            Profile
          </Link>

        </nav>


        {/* REAL LOGOUT */}

        <button
          type="button"
          className="nav-item logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <main className="dashboard-main">


        {/* ====================================
            TOP BAR
        ===================================== */}

        <header className="dashboard-header">

          <div></div>


          <div className="user-info">

            <div className="user-avatar">
              {userInitial}
            </div>

            <div>

              <strong>
                {userName}
              </strong>

              <small>
                Passenger
              </small>

            </div>

            <span>
              ⌄
            </span>

          </div>

        </header>


        {/* ====================================
            WELCOME
        ===================================== */}

        <section className="welcome-section">

          <h1>
            Good evening, {userName}
          </h1>

          <p>
            Track and manage your baggage journey
          </p>

        </section>


        {/* ====================================
            STATISTICS
        ===================================== */}

        <section className="stats-grid">


          {/* TOTAL */}

          <div className="stat-card">

            <div className="stat-icon blue">
              ▣
            </div>

            <div>

              <h2>
                {totalBaggage}
              </h2>

              <p>
                Total Baggage
              </p>

            </div>

          </div>


          {/* IN TRANSIT */}

          <div className="stat-card">

            <div className="stat-icon green">
              ✈
            </div>

            <div>

              <h2>
                {inTransitCount}
              </h2>

              <p>
                In Transit
              </p>

            </div>

          </div>


          {/* DELAYED */}

          <div className="stat-card">

            <div className="stat-icon orange">
              ◷
            </div>

            <div>

              <h2>
                {delayedCount}
              </h2>

              <p>
                Delayed
              </p>

            </div>

          </div>


          {/* LOST */}

          <div className="stat-card">

            <div className="stat-icon red">
              △
            </div>

            <div>

              <h2>
                {lostCount}
              </h2>

              <p>
                Lost
              </p>

            </div>

          </div>

        </section>


        {/* ====================================
            DASHBOARD GRID
        ===================================== */}

        <section className="dashboard-grid">


          {/* ==================================
              UPCOMING FLIGHT
          =================================== */}

          <div className="dashboard-panel flight-panel">

            <div className="panel-header">

              <h2>
                Upcoming Flight
              </h2>


              {/* SHOW ARROW ONLY IF FLIGHT EXISTS */}

              {upcomingFlight && (

                <button
                  type="button"
                  className="flight-dropdown-btn"
                  onClick={() =>
                    setShowFlightDetails(
                      !showFlightDetails
                    )
                  }
                >

                  {showFlightDetails
                    ? "⌃"
                    : "⌄"}

                </button>

              )}

            </div>


            {/* =================================
                FLIGHT EXISTS
            ================================== */}

            {upcomingFlight ? (

              <>

                <div className="flight-content">

                  <div>

                    <h1>
                      {upcomingFlight.flightNumber ||
                        "Flight"}
                    </h1>


                    <p className="route">

                      {upcomingFlight.source ||
                        "Source"}

                      <span>
                        →
                      </span>

                      {upcomingFlight.destination ||
                        "Destination"}

                    </p>


                    <p className="flight-date">

                      {formatDate(
                        upcomingFlight.departureTime ||
                        upcomingFlight.departure
                      )}

                    </p>


                    <span className="status-badge">
                      On Time
                    </span>

                  </div>


                  <div className="flight-icon">
                    ✈
                  </div>

                </div>


                {/* VIEW DETAILS */}

                <button
                  type="button"
                  className="view-details-btn"
                  onClick={() =>
                    setShowFlightDetails(true)
                  }
                >
                  View Details
                </button>


                {/* =================================
                    FLIGHT DETAILS
                ================================== */}

                {showFlightDetails && (

                  <div className="flight-details-box">


                    <div className="flight-detail-row">

                      <span>
                        Flight Number
                      </span>

                      <strong>
                        {upcomingFlight.flightNumber ||
                          "Not available"}
                      </strong>

                    </div>


                    <div className="flight-detail-row">

                      <span>
                        Airline
                      </span>

                      <strong>
                        {upcomingFlight.airline ||
                          "Not available"}
                      </strong>

                    </div>


                    <div className="flight-detail-row">

                      <span>
                        From
                      </span>

                      <strong>
                        {upcomingFlight.source ||
                          "Not available"}
                      </strong>

                    </div>


                    <div className="flight-detail-row">

                      <span>
                        To
                      </span>

                      <strong>
                        {upcomingFlight.destination ||
                          "Not available"}
                      </strong>

                    </div>


                    <div className="flight-detail-row">

                      <span>
                        Departure
                      </span>

                      <strong>

                        {formatDate(
                          upcomingFlight.departureTime ||
                          upcomingFlight.departure
                        )}

                        {" "}

                        {formatTime(
                          upcomingFlight.departureTime ||
                          upcomingFlight.departure
                        )}

                      </strong>

                    </div>


                    <div className="flight-detail-row">

                      <span>
                        Arrival
                      </span>

                      <strong>

                        {formatDate(
                          upcomingFlight.arrivalTime ||
                          upcomingFlight.arrival
                        )}

                        {" "}

                        {formatTime(
                          upcomingFlight.arrivalTime ||
                          upcomingFlight.arrival
                        )}

                      </strong>

                    </div>

                  </div>

                )}

              </>

            ) : (

              /* =================================
                  NO FLIGHT
              ================================== */

              <div className="empty-dashboard-message">

                <div className="empty-icon">
                  ✈
                </div>

                <h3>
                  No Upcoming Flight
                </h3>

                <p>
                  You don't have any baggage or
                  upcoming flight assigned yet.
                </p>

              </div>

            )}

          </div>


          {/* ==================================
              RECENT NOTIFICATIONS
          =================================== */}

          <div className="dashboard-panel notifications-panel">

            <div className="panel-header">

              <h2>
                Recent Notifications
              </h2>

              <Link
                to="/passenger/notifications"
              >
                View All
              </Link>

            </div>


            {notifications.length > 0 ? (

              notifications
                .slice(0, 3)
                .map(
                  (
                    notification,
                    index
                  ) => (

                    <div
                      className="notification-item"
                      key={
                        notification.id ||
                        index
                      }
                    >

                      <div
                        className={
                          `notification-icon ${
                            index === 1
                              ? "green-icon"
                              : "blue-icon"
                          }`
                        }
                      >

                        {index === 1
                          ? "✓"
                          : "✈"}

                      </div>


                      <div className="notification-content">

                        <strong>
                          {getNotificationTitle(
                            notification
                          )}
                        </strong>


                        <p>
                          {getNotificationMessage(
                            notification
                          )}
                        </p>

                      </div>


                      <small>

                        {formatTime(
                          getNotificationTime(
                            notification
                          )
                        )}

                      </small>

                    </div>

                  )
                )

            ) : (

              <div className="empty-notifications">

                <div className="empty-icon">
                  ♧
                </div>

                <h3>
                  No Recent Notifications
                </h3>

                <p>
                  You don't have any baggage
                  notifications yet.
                </p>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default PassengerDashboard;