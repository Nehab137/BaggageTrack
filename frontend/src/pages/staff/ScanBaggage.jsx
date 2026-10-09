import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";
import "./ScanBaggage.css";

function ScanBaggage() {
  const [tagId, setTagId] = useState("");
  const [flightNumber, setFlightNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleScan = async (event) => {
    event.preventDefault();

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await API.post("/scan/baggage", {
        tagId: tagId,
        flightNumber: flightNumber,
      });

      console.log("Scan response:", response.data);

      setResult(response.data);
    } catch (error) {
      console.error("FULL SCAN ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response data:", error.response.data);
        console.log("Response headers:", error.response.headers);

        const responseData = error.response.data;

        let message = "";

        if (typeof responseData === "string") {
          message = responseData;
        } else if (responseData?.message) {
          message = responseData.message;
        } else if (Object.keys(responseData || {}).length > 0) {
          message = JSON.stringify(responseData);
        }

        setError(
          `Server Error ${error.response.status}: ${
            message || "No error message returned by backend."
          }`
        );
      } else if (error.request) {
        setError(
          "No response from Spring Boot. Check that the backend is running on port 8080."
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearScan = () => {
    setTagId("");
    setFlightNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="staff-layout">

      {/* Sidebar */}
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

          <Link to="/staff/scan" className="staff-nav-item active">
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
            <h1>Scan Baggage</h1>
            <p>Validate baggage before updating its status.</p>
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


        {/* Scan Card */}
        <section className="scan-card">

          <div className="scan-card-header">

            <div className="scan-icon">
              ▣
            </div>

            <div>
              <h2>Baggage Validation</h2>

              <p>
                Enter the baggage tag and flight number to verify the baggage.
              </p>
            </div>

          </div>


          {/* Form */}
          <form onSubmit={handleScan}>

            <div className="scan-form-grid">

              {/* Baggage Tag */}
              <div className="scan-form-group">

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
                  Enter the unique baggage tag generated at check-in.
                </small>

              </div>


              {/* Flight Number */}
              <div className="scan-form-group">

                <label htmlFor="flightNumber">
                  Flight Number
                </label>

                <input
                  id="flightNumber"
                  type="text"
                  placeholder="Example: AI202"
                  value={flightNumber}
                  onChange={(event) =>
                    setFlightNumber(event.target.value)
                  }
                  required
                />

                <small>
                  Enter the flight associated with the baggage.
                </small>

              </div>

            </div>


            {/* Buttons */}
            <div className="scan-actions">

              <button
                type="button"
                className="clear-btn"
                onClick={clearScan}
              >
                Clear
              </button>

              <button
                type="submit"
                className="validate-btn"
                disabled={loading}
              >
                {loading
                  ? "Validating..."
                  : "Validate Baggage"}
              </button>

            </div>

          </form>


          {/* Error Result */}
          {error && (
            <div className="scan-result error-result">

              <div className="result-icon">
                ⚠
              </div>

              <div className="result-content">

                <strong>
                  Validation Failed
                </strong>

                <p>
                  {error}
                </p>

              </div>

            </div>
          )}


          {/* Successful / Mismatch Result */}
          {result && (
            <div
              className={`scan-result ${
                result.status === "VALID"
                  ? "valid-result"
                  : "mismatch-result"
              }`}
            >

              <div className="result-icon">
                {result.status === "VALID"
                  ? "✓"
                  : "⚠"}
              </div>

              <div className="result-content">

                <strong>
                  {result.status === "VALID"
                    ? "Baggage Validated"
                    : "Baggage Mismatch"}
                </strong>

                <p>
                  {result.message ||
                    (result.status === "VALID"
                      ? "The baggage matches the selected flight."
                      : "The baggage does not match the selected flight.")}
                </p>


                {/* Baggage Details */}
                {result.baggage && (
                  <div className="result-details">

                    <span>
                      Tag:
                      <strong>
                        {result.baggage.tagId}
                      </strong>
                    </span>

                    <span>
                      Flight:
                      <strong>
                        {result.baggage.flight?.flightNumber ||
                          flightNumber}
                      </strong>
                    </span>

                    <span>
                      Status:
                      <strong>
                        {result.baggage.status}
                      </strong>
                    </span>

                  </div>
                )}

              </div>

            </div>
          )}

        </section>


        {/* Scanning Process */}
        <section className="scan-info-card">

          <h2>Scanning Process</h2>

          <div className="scan-steps">

            <div className="scan-step">

              <span>1</span>

              <div>
                <strong>Enter Tag</strong>

                <p>
                  Enter or scan the baggage tag ID.
                </p>
              </div>

            </div>


            <div className="scan-step">

              <span>2</span>

              <div>
                <strong>Enter Flight</strong>

                <p>
                  Enter the flight number.
                </p>
              </div>

            </div>


            <div className="scan-step">

              <span>3</span>

              <div>
                <strong>Validate</strong>

                <p>
                  The system checks the baggage-flight match.
                </p>
              </div>

            </div>


            <div className="scan-step">

              <span>4</span>

              <div>
                <strong>Update Status</strong>

                <p>
                  Valid baggage can proceed to the next stage.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ScanBaggage;