import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./Mismatches.css";

function Mismatches() {
  const [tagId, setTagId] = useState("");
  const [expectedFlight, setExpectedFlight] = useState("");
  const [scannedFlight, setScannedFlight] = useState("");
  const [location, setLocation] = useState("");
  const [remarks, setRemarks] = useState("");

  const [mismatch, setMismatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async (event) => {
    event.preventDefault();

    setError("");
    setMismatch(null);

    // Check whether there is actually a mismatch
    if (
      expectedFlight.trim().toUpperCase() ===
      scannedFlight.trim().toUpperCase()
    ) {
      setError(
        "No mismatch detected. Expected flight and scanned flight are the same."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/mismatches", {
        tagId: tagId.trim(),
        expectedFlight: expectedFlight.trim().toUpperCase(),
        scannedFlight: scannedFlight.trim().toUpperCase(),
        location: location.trim(),
        remarks: remarks.trim(),
      });

      console.log("Mismatch saved:", response.data);

      setMismatch(response.data);
    } catch (err) {
      console.error("Mismatch API error:", err);

      if (err.response) {
        const responseData = err.response.data;

        setError(
          `Backend Error ${err.response.status}: ${
            typeof responseData === "string"
              ? responseData
              : JSON.stringify(responseData)
          }`
        );
      } else if (err.request) {
        setError(
          "No response from backend. Make sure Spring Boot is running on port 8080."
        );
      } else {
        setError(`Request Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTagId("");
    setExpectedFlight("");
    setScannedFlight("");
    setLocation("");
    setRemarks("");
    setMismatch(null);
    setError("");
  };

  return (
    <div className="staff-layout">

      {/* SIDEBAR */}
      <aside className="staff-sidebar">

        <div className="staff-logo">
          <span>✈</span>
          <strong>BaggageTrack</strong>
        </div>

        <nav className="staff-nav">

          <Link to="/staff" className="staff-nav-item">
            <span>⌂</span>
            Dashboard
          </Link>

          <Link to="/staff/scan" className="staff-nav-item">
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
            className="staff-nav-item active"
          >
            <span>⚠</span>
            Mismatches
          </Link>

          <Link
            to="/staff/profile"
            className="staff-nav-item"
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


      {/* MAIN CONTENT */}
      <main className="staff-main">

        {/* HEADER */}
        <header className="staff-header">

          <div>
            <h1>Baggage Mismatches</h1>

            <p>
              Verify baggage and identify flight mismatches.
            </p>
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


        {/* MISMATCH FORM */}
        <section className="mismatch-card">

          <div className="mismatch-card-header">

            <div className="mismatch-icon">
              ⚠
            </div>

            <div>
              <h2>Check Baggage Mismatch</h2>

              <p>
                Enter the expected and scanned flight details
                to identify a baggage mismatch.
              </p>
            </div>

          </div>


          <form onSubmit={handleCheck}>

            <div className="mismatch-form-grid">

              {/* TAG ID */}
              <div className="mismatch-form-group">

                <label htmlFor="tagId">
                  Baggage Tag ID
                </label>

                <input
                  id="tagId"
                  type="text"
                  placeholder="Example: BG-2026-002"
                  value={tagId}
                  onChange={(event) =>
                    setTagId(event.target.value)
                  }
                  required
                />

                <small>
                  Enter the baggage tag being checked.
                </small>

              </div>


              {/* EXPECTED FLIGHT */}
              <div className="mismatch-form-group">

                <label htmlFor="expectedFlight">
                  Expected Flight
                </label>

                <input
                  id="expectedFlight"
                  type="text"
                  placeholder="Example: AI202"
                  value={expectedFlight}
                  onChange={(event) =>
                    setExpectedFlight(event.target.value)
                  }
                  required
                />

                <small>
                  Flight assigned to the baggage.
                </small>

              </div>


              {/* SCANNED FLIGHT */}
              <div className="mismatch-form-group">

                <label htmlFor="scannedFlight">
                  Scanned Flight
                </label>

                <input
                  id="scannedFlight"
                  type="text"
                  placeholder="Example: AI305"
                  value={scannedFlight}
                  onChange={(event) =>
                    setScannedFlight(event.target.value)
                  }
                  required
                />

                <small>
                  Flight detected during scanning.
                </small>

              </div>


              {/* LOCATION */}
              <div className="mismatch-form-group">

                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  placeholder="Example: Hyderabad Airport"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  required
                />

                <small>
                  Location where the mismatch was detected.
                </small>

              </div>


              {/* REMARKS */}
              <div className="mismatch-form-group full-width">

                <label htmlFor="remarks">
                  Remarks
                </label>

                <textarea
                  id="remarks"
                  rows="4"
                  placeholder="Describe the mismatch..."
                  value={remarks}
                  onChange={(event) =>
                    setRemarks(event.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* ERROR MESSAGE */}
            {error && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "14px",
                  borderRadius: "8px",
                  backgroundColor: "#ffe5e5",
                  color: "#c62828",
                  fontWeight: "600",
                  wordBreak: "break-word",
                }}
              >
                ⚠️ {error}
              </div>
            )}


            {/* BUTTONS */}
            <div className="mismatch-actions">

              <button
                type="button"
                className="clear-btn"
                onClick={clearForm}
                disabled={loading}
              >
                Clear
              </button>

              <button
                type="submit"
                className="check-mismatch-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Check Mismatch"}
              </button>

            </div>

          </form>


          {/* SUCCESS RESULT */}
          {mismatch && (

            <div className="mismatch-result">

              <div className="mismatch-result-icon">
                ⚠
              </div>

              <div className="mismatch-result-content">

                <strong>
                  Baggage Mismatch Detected
                </strong>

                <p>
                  The baggage is associated with a different
                  flight than the scanned flight.
                </p>

                <div className="mismatch-details">

                  <span>
                    Tag:
                    <strong>
                      {mismatch.tagId}
                    </strong>
                  </span>

                  <span>
                    Expected:
                    <strong>
                      {mismatch.expectedFlight}
                    </strong>
                  </span>

                  <span>
                    Scanned:
                    <strong>
                      {mismatch.scannedFlight}
                    </strong>
                  </span>

                  <span>
                    Location:
                    <strong>
                      {mismatch.location}
                    </strong>
                  </span>

                  <span>
                    Status:
                    <strong>
                      {mismatch.status || "OPEN"}
                    </strong>
                  </span>

                </div>

              </div>

            </div>

          )}

        </section>


        {/* INFORMATION */}
        <section className="mismatch-info-card">

          <h2>Mismatch Handling Process</h2>

          <div className="mismatch-process">

            <div className="process-item">
              <span>1</span>

              <div>
                <strong>Scan Baggage</strong>

                <p>
                  Scan or enter the baggage tag.
                </p>
              </div>
            </div>


            <div className="process-item">
              <span>2</span>

              <div>
                <strong>Verify Flight</strong>

                <p>
                  Compare the expected and scanned flight.
                </p>
              </div>
            </div>


            <div className="process-item">
              <span>3</span>

              <div>
                <strong>Identify Mismatch</strong>

                <p>
                  Detect baggage assigned to another flight.
                </p>
              </div>
            </div>


            <div className="process-item">
              <span>4</span>

              <div>
                <strong>Resolve</strong>

                <p>
                  Staff can take corrective action.
                </p>
              </div>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Mismatches;