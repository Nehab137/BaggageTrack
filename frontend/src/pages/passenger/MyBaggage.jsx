import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

function MyBaggage() {

  // Get logged-in passenger's name
  const userName = localStorage.getItem("name") || "Passenger";

  // Get first letter for avatar
  const userInitial = userName.charAt(0).toUpperCase();

  const [baggageList, setBaggageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch only the logged-in passenger's baggage
  useEffect(() => {

    const fetchMyBaggage = async () => {

      try {

        const response = await API.get("/baggage/my");

        setBaggageList(response.data || []);

      } catch (err) {

        console.error("Error fetching baggage:", err);

        if (err.response) {

          setError(
            `Unable to load baggage. Server returned ${err.response.status}.`
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

    fetchMyBaggage();

  }, []);


  // Convert backend status to display text
  const getStatusName = (status) => {

    switch (status) {

      case "CHECK_IN":
        return "Check-in";

      case "SECURITY_SCREENING":
        return "Security Screening";

      case "LOADING":
        return "Loading";

      case "IN_TRANSIT":
        return "In Transit";

      case "ARRIVAL":
        return "Arrival";

      case "DELAYED":
        return "Delayed";

      case "LOST":
        return "Lost";

      default:
        return status || "Unknown";

    }

  };


  // Status description
  const getStatusDescription = (status) => {

    switch (status) {

      case "CHECK_IN":
        return "Your baggage has been successfully checked in.";

      case "SECURITY_SCREENING":
        return "Your baggage is currently undergoing security screening.";

      case "LOADING":
        return "Your baggage is being loaded onto the aircraft.";

      case "IN_TRANSIT":
        return "Your baggage is travelling with the flight.";

      case "ARRIVAL":
        return "Your baggage has arrived at the destination.";

      case "DELAYED":
        return "Your baggage has been delayed.";

      case "LOST":
        return "Your baggage has been reported as lost.";

      default:
        return "Your baggage status has been updated.";

    }

  };


  return (
    <div className="passenger-layout">

      {/* =========================
          SIDEBAR
      ========================== */}

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
            className="nav-item active"
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


        <Link
          to="/"
          className="nav-item logout"
        >
          <span>↪</span>
          Logout
        </Link>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="dashboard-main">

        {/* HEADER */}

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


        {/* PAGE TITLE */}

        <section className="welcome-section">

          <h1>
            My Baggage
          </h1>

          <p>
            View and track all your registered baggage.
          </p>

        </section>


        {/* =========================
            LOADING
        ========================== */}

        {loading && (

          <div className="baggage-details-card">

            <h3>
              Loading baggage information...
            </h3>

          </div>

        )}


        {/* =========================
            ERROR
        ========================== */}

        {!loading && error && (

          <div className="baggage-details-card">

            <h3>
              Unable to load baggage
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* =========================
            NO BAGGAGE
        ========================== */}

        {!loading &&
          !error &&
          baggageList.length === 0 && (

            <div className="baggage-details-card">

              <div className="baggage-card-header">

                <div>

                  <span className="baggage-label">
                    MY BAGGAGE
                  </span>

                  <h2>
                    No Baggage Found
                  </h2>

                </div>

              </div>


              <div className="baggage-current-status">

                <div className="status-icon">
                  ✈
                </div>

                <div>

                  <span>
                    Baggage Information
                  </span>

                  <strong>
                    No baggage has been registered yet.
                  </strong>

                  <p>
                    Once your baggage is registered,
                    it will appear here automatically.
                  </p>

                </div>

              </div>

            </div>

        )}


        {/* =========================
            BAGGAGE LIST
        ========================== */}

        {!loading &&
          !error &&
          baggageList.length > 0 && (

            <div>

              {baggageList.map((baggage) => (

                <div
                  className="baggage-details-card"
                  key={baggage.id}
                  style={{ marginBottom: "20px" }}
                >

                  {/* CARD HEADER */}

                  <div className="baggage-card-header">

                    <div>

                      <span className="baggage-label">
                        BAGGAGE TAG
                      </span>

                      <h2>
                        {baggage.tagId}
                      </h2>

                    </div>


                    <span className="baggage-status">
                      {getStatusName(baggage.status)}
                    </span>

                  </div>


                  {/* BAGGAGE INFORMATION */}

                  <div className="baggage-info-grid">

                    <div className="baggage-info-item">

                      <span>
                        Flight
                      </span>

                      <strong>
                        {baggage.flight?.flightNumber || "N/A"}
                      </strong>

                    </div>


                    <div className="baggage-info-item">

                      <span>
                        Airline
                      </span>

                      <strong>
                        {baggage.flight?.airline || "N/A"}
                      </strong>

                    </div>


                    <div className="baggage-info-item">

                      <span>
                        Route
                      </span>

                      <strong>
                        {baggage.flight?.source || "N/A"}
                        {" → "}
                        {baggage.flight?.destination || "N/A"}
                      </strong>

                    </div>


                    <div className="baggage-info-item">

                      <span>
                        Weight
                      </span>

                      <strong>
                        {baggage.weight ?? "N/A"} kg
                      </strong>

                    </div>

                  </div>


                  {/* CURRENT STATUS */}

                  <div className="baggage-current-status">

                    <div className="status-icon">
                      ✓
                    </div>

                    <div>

                      <span>
                        Current Status
                      </span>

                      <strong>
                        {getStatusName(baggage.status)}
                      </strong>

                      <p>
                        {getStatusDescription(baggage.status)}
                      </p>

                    </div>

                  </div>


                  {/* TRACK BUTTON */}

                  <Link
                    to={`/passenger/track?id=${baggage.id}`}
                    className="track-baggage-btn"
                  >
                    Track Baggage →
                  </Link>

                </div>

              ))}

            </div>

        )}

      </main>

    </div>
  );
}

export default MyBaggage;