import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import "./TrackBaggage.css";

function TrackBaggage() {

  // Get logged-in passenger's name
  const userName = localStorage.getItem("name") || "Passenger";
  const userInitial = userName.charAt(0).toUpperCase();

  // Get selected baggage ID from URL
  const [searchParams] = useSearchParams();
  const selectedBaggageId = searchParams.get("id");

  const [baggage, setBaggage] = useState(null);
  const [baggageList, setBaggageList] = useState([]);
  const [historyStatuses, setHistoryStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch passenger baggage and selected baggage history
  useEffect(() => {

    const fetchBaggage = async () => {

      try {

        // Get only the logged-in passenger's baggage
        const response = await API.get("/baggage/my");

        const myBaggage = response.data || [];

        setBaggageList(myBaggage);

        // No baggage
        if (myBaggage.length === 0) {
          setError(
            "No baggage has been registered for this account."
          );
          return;
        }

        // Find selected baggage
        let selectedBaggage = null;

        if (selectedBaggageId) {

          selectedBaggage = myBaggage.find(
            (item) =>
              String(item.id) === String(selectedBaggageId)
          );

        }

        // If no valid ID was provided,
        // show the first baggage
        if (!selectedBaggage) {

          selectedBaggage = myBaggage[0];

        }

        setBaggage(selectedBaggage);


        // Fetch actual baggage status history
        try {

          const historyResponse = await API.get(
            `/baggage-history/baggage/${selectedBaggage.id}`
          );

          const statuses = (historyResponse.data || [])
            .map((item) => item.status)
            .filter(Boolean);

          // Remove duplicate statuses
          setHistoryStatuses(
            [...new Set(statuses)]
          );

        } catch (historyError) {

          console.error(
            "Error fetching baggage history:",
            historyError
          );

          // If history cannot be loaded,
          // still show the baggage itself
          setHistoryStatuses([]);

        }

      } catch (err) {

        console.error(
          "Error fetching baggage:",
          err
        );

        if (err.response) {

          setError(
            `Unable to load baggage details. Server returned ${err.response.status}.`
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

    fetchBaggage();

  }, [selectedBaggageId]);


  // Loading screen
  if (loading) {

    return (
      <div className="passenger-layout">

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
              className="nav-item active"
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

        <main className="dashboard-main">

          <section className="welcome-section">

            <h1>
              Track Baggage
            </h1>

            <p>
              Loading baggage information...
            </p>

          </section>

        </main>

      </div>
    );
  }


  // Error / no baggage screen
  if (error || !baggage) {

    return (
      <div className="passenger-layout">

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
              className="nav-item active"
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

        <main className="dashboard-main">

          <section className="welcome-section">

            <h1>
              Track Baggage
            </h1>

            <p>
              {error || "No baggage available."}
            </p>

            <Link
              to="/passenger/baggage"
              className="back-baggage-btn"
            >
              ← Back to My Baggage
            </Link>

          </section>

        </main>

      </div>
    );
  }


  // Current baggage status
  const currentStatus =
    baggage.status || "CHECK_IN";


  // Timeline stages
  const stages = [
    {
      key: "CHECK_IN",
      title: "Check-in",
      description:
        "Baggage checked in successfully."
    },
    {
      key: "SECURITY_SCREENING",
      title: "Security Screening",
      description:
        "Baggage is undergoing security screening."
    },
    {
      key: "LOADING",
      title: "Loading",
      description:
        "Baggage is being loaded onto the aircraft."
    },
    {
      key: "IN_TRANSIT",
      title: "In Transit",
      description:
        "Baggage is travelling with the flight."
    },
    {
      key: "ARRIVAL",
      title: "Arrival",
      description:
        "Baggage has arrived at the destination."
    }
  ];


  // Convert status to display name
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


  return (
    <div className="passenger-layout">

      {/* =========================
          SIDEBAR
      ========================== */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <span>✈</span>

          <strong>
            BaggageTrack
          </strong>

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
            className="nav-item active"
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
            Track Baggage
          </h1>

          <p>
            Follow your baggage journey from check-in to arrival.
          </p>

        </section>


        {/* TRACKING CARD */}

        <div className="tracking-card">


          {/* BAGGAGE HEADER */}

          <div className="tracking-header">

            <div>

              <span className="baggage-label">
                BAGGAGE TAG
              </span>

              <h2>
                {baggage.tagId}
              </h2>

            </div>

            <span className="baggage-status">
              {getStatusName(currentStatus)}
            </span>

          </div>


          {/* FLIGHT INFORMATION */}

          <div className="tracking-flight-info">


            <div>

              <span>
                Flight
              </span>

              <strong>
                {baggage.flight?.flightNumber || "N/A"}
              </strong>

            </div>


            <div>

              <span>
                Route
              </span>

              <strong>
                {baggage.flight?.source || "N/A"}
                {" → "}
                {baggage.flight?.destination || "N/A"}
              </strong>

            </div>


            <div>

              <span>
                Airline
              </span>

              <strong>
                {baggage.flight?.airline || "N/A"}
              </strong>

            </div>


            <div>

              <span>
                Weight
              </span>

              <strong>
                {baggage.weight ?? "N/A"} kg
              </strong>

            </div>

          </div>


          {/* TIMELINE */}

          <div className="tracking-timeline">

            {stages.map((stage, index) => {

              // Stage is completed if it exists
              // in the actual baggage history
              const isCompleted =
                historyStatuses.includes(stage.key);

              // Stage is current only when baggage
              // status matches this stage
              const isCurrent =
                currentStatus === stage.key;


              return (
                <div key={stage.key}>


                  {/* TIMELINE ITEM */}

                  <div
                    className={`timeline-item ${
                      isCompleted
                        ? "completed"
                        : ""
                    } ${
                      isCurrent
                        ? "current"
                        : ""
                    }`}
                  >


                    {/* ICON */}

                    <div className="timeline-icon">

                      {isCompleted
                        ? "✓"
                        : index + 1}

                    </div>


                    {/* CONTENT */}

                    <div className="timeline-content">

                      <h3>
                        {stage.title}
                      </h3>

                      <p>
                        {stage.description}
                      </p>


                      <span>

                        {isCurrent
                          ? "Current Status"
                          : isCompleted
                          ? "Completed"
                          : "Pending"}

                      </span>

                    </div>

                  </div>


                  {/* CONNECTING LINE */}

                  {index < stages.length - 1 && (

                    <div className="timeline-line"></div>

                  )}

                </div>
              );

            })}

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
                {getStatusName(currentStatus)}
              </strong>

              <p>
                Your baggage is currently at the{" "}
                {getStatusName(currentStatus).toLowerCase()} stage.
              </p>

            </div>

          </div>


          {/* BACK BUTTON */}

          <Link
            to="/passenger/baggage"
            className="back-baggage-btn"
          >
            ← Back to My Baggage
          </Link>

        </div>

      </main>

    </div>
  );
}

export default TrackBaggage;