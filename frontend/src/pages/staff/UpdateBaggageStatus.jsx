import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./UpdateBaggageStatus.css";

function UpdateBaggageStatus() {

  const [baggageId, setBaggageId] = useState("");
  const [status, setStatus] = useState("SECURITY_SCREENING");
  const [location, setLocation] = useState("");
  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {

      const response = await API.put(
        `/baggage/${baggageId}/status`,
        {
          status: status,
          location: location,
          remarks: remarks
        }
      );

      console.log("Status update response:", response.data);

      setSuccess(
        `Baggage status successfully updated to ${status}.`
      );

    } catch (error) {

      console.error("STATUS UPDATE ERROR:", error);

      if (error.response) {

        setError(
          `Server Error ${error.response.status}: ${
            typeof error.response.data === "string"
              ? error.response.data
              : "Unable to update baggage status."
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


  const clearForm = () => {

    setBaggageId("");
    setStatus("SECURITY_SCREENING");
    setLocation("");
    setRemarks("");
    setSuccess("");
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
            className="staff-nav-item active"
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

            <h1>Update Baggage Status</h1>

            <p>
              Update the current status and location of baggage.
            </p>

          </div>


          <div className="staff-user">

            <div className="staff-avatar">
              S
            </div>

            <div>

              <strong>Staff</strong>

              <small>
                Airline Staff
              </small>

            </div>

          </div>

        </header>


        {/* UPDATE CARD */}

        <section className="update-card">

          <div className="update-card-header">

            <div className="update-icon">
              ↻
            </div>

            <div>

              <h2>Update Baggage Status</h2>

              <p>
                Enter the baggage ID and update its current journey stage.
              </p>

            </div>

          </div>


          <form onSubmit={handleUpdate}>

            <div className="update-form-grid">

              {/* BAGGAGE ID */}

              <div className="update-form-group">

                <label htmlFor="baggageId">
                  Baggage ID
                </label>

                <input
                  id="baggageId"
                  type="number"
                  placeholder="Example: 1"
                  value={baggageId}
                  onChange={(event) =>
                    setBaggageId(event.target.value)
                  }
                  required
                />

                <small>
                  Enter the baggage database ID.
                </small>

              </div>


              {/* STATUS */}

              <div className="update-form-group">

                <label htmlFor="status">
                  New Status
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                  required
                >

                  <option value="CHECK_IN">
                    CHECK IN
                  </option>

                  <option value="SECURITY_SCREENING">
                    SECURITY SCREENING
                  </option>

                  <option value="LOADING">
                    LOADING
                  </option>

                  <option value="IN_TRANSIT">
                    IN TRANSIT
                  </option>

                  <option value="ARRIVAL">
                    ARRIVAL
                  </option>

                  <option value="DELAYED">
                    DELAYED
                  </option>

                  <option value="LOST">
                    LOST
                  </option>

                </select>

                <small>
                  Select the latest baggage stage.
                </small>

              </div>


              {/* LOCATION */}

              <div className="update-form-group">

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
                  Enter the current baggage location.
                </small>

              </div>


              {/* REMARKS */}

              <div className="update-form-group">

                <label htmlFor="remarks">
                  Remarks
                </label>

                <textarea
                  id="remarks"
                  placeholder="Example: Baggage moved to loading area."
                  value={remarks}
                  onChange={(event) =>
                    setRemarks(event.target.value)
                  }
                  rows="4"
                  required
                />

                <small>
                  Add any useful information about this update.
                </small>

              </div>

            </div>


            {/* BUTTONS */}

            <div className="update-actions">

              <button
                type="button"
                className="clear-btn"
                onClick={clearForm}
              >
                Clear
              </button>


              <button
                type="submit"
                className="update-btn"
                disabled={loading}
              >

                {loading
                  ? "Updating..."
                  : "Update Status"}

              </button>

            </div>

          </form>


          {/* SUCCESS */}

          {success && (

            <div className="status-result success-result">

              <div className="result-icon">
                ✓
              </div>

              <div>

                <strong>
                  Status Updated Successfully
                </strong>

                <p>
                  {success}
                </p>

              </div>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div className="status-result error-result">

              <div className="result-icon">
                ⚠
              </div>

              <div>

                <strong>
                  Update Failed
                </strong>

                <p>
                  {error}
                </p>

              </div>

            </div>

          )}

        </section>


        {/* STATUS FLOW */}

        <section className="status-flow-card">

          <h2>Baggage Journey</h2>

          <div className="status-flow">

            <span>CHECK IN</span>
            <b>→</b>

            <span>SECURITY</span>
            <b>→</b>

            <span>LOADING</span>
            <b>→</b>

            <span>IN TRANSIT</span>
            <b>→</b>

            <span>ARRIVAL</span>

          </div>

          <p>
            DELAYED or LOST can be selected when an issue occurs.
          </p>

        </section>

      </main>

    </div>
  );
}

export default UpdateBaggageStatus;