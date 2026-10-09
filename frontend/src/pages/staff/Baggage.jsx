import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./Baggage.css";

function Baggage() {

  const [baggage, setBaggage] = useState([]);

  const [passengers, setPassengers] = useState([]);
  const [flights, setFlights] = useState([]);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [generatedBaggage, setGeneratedBaggage] = useState(null);

  const [formData, setFormData] = useState({
    passengerId: "",
    flightId: "",
    weight: ""
  });


  // ==========================================
  // FETCH BAGGAGE
  // ==========================================

  const fetchBaggage = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await API.get("/baggage");

      setBaggage(response.data || []);

    } catch (error) {

      console.error("BAGGAGE FETCH ERROR:", error);

      if (error.response) {

        setError(
          `Server Error ${error.response.status}: ${
            typeof error.response.data === "string"
              ? error.response.data
              : "Unable to load baggage."
          }`
        );

      } else if (error.request) {

        setError(
          "No response from Spring Boot. Check that the backend is running."
        );

      } else {

        setError(error.message);

      }

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // FETCH PASSENGERS
  // ==========================================

  const fetchPassengers = async () => {

    try {

      const response = await API.get("/users");

      const users = response.data || [];

      const passengerUsers = users.filter(
        (user) =>
          user.role?.toUpperCase() === "PASSENGER"
      );

      setPassengers(passengerUsers);

    } catch (error) {

      console.error(
        "PASSENGER FETCH ERROR:",
        error
      );

      setError(
        "Unable to load passenger accounts."
      );

    }
  };


  // ==========================================
  // FETCH FLIGHTS
  // ==========================================

  const fetchFlights = async () => {

    try {

      const response = await API.get("/flights");

      setFlights(response.data || []);

    } catch (error) {

      console.error(
        "FLIGHT FETCH ERROR:",
        error
      );

      setError(
        "Unable to load flight information."
      );

    }
  };


  // ==========================================
  // LOAD PAGE DATA
  // ==========================================

  useEffect(() => {

    fetchBaggage();
    fetchPassengers();
    fetchFlights();

  }, []);


  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // ==========================================
  // ADD BAGGAGE
  // ==========================================

  const handleAddBaggage = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");
    setGeneratedBaggage(null);

    if (!formData.passengerId) {

      setError(
        "Please select a passenger."
      );

      return;
    }

    if (!formData.flightId) {

      setError(
        "Please select a flight."
      );

      return;
    }

    const weightValue = Number(formData.weight);

    if (
      !formData.weight ||
      !Number.isFinite(weightValue) ||
      weightValue <= 0
    ) {

      setError(
        "Please enter a valid baggage weight."
      );

      return;
    }


    setAdding(true);

    try {

      const response = await API.post(
        "/baggage",
        {
          weight: weightValue,

          passenger: {
            id: Number(formData.passengerId)
          },

          flight: {
            id: Number(formData.flightId)
          }
        }
      );


      const savedBaggage =
        response.data;


      setGeneratedBaggage(
        savedBaggage
      );


      setMessage(
        "Baggage added successfully!"
      );


      // Clear form

      setFormData({
        passengerId: "",
        flightId: "",
        weight: ""
      });


      // Reload baggage table

      await fetchBaggage();

    } catch (error) {

      console.error(
        "ADD BAGGAGE ERROR:",
        error
      );

      if (error.response) {

        const data =
          error.response.data;

        if (
          typeof data === "string"
        ) {

          setError(data);

        } else {

          setError(
            data?.message ||
            "Unable to add baggage."
          );

        }

      } else if (error.request) {

        setError(
          "No response from Spring Boot. Check that the backend is running."
        );

      } else {

        setError(
          error.message
        );

      }

    } finally {

      setAdding(false);

    }
  };


  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {

    switch (status) {

      case "ARRIVAL":
        return "status-arrival";

      case "IN_TRANSIT":
        return "status-transit";

      case "LOADING":
        return "status-loading";

      case "SECURITY_SCREENING":
        return "status-security";

      case "CHECK_IN":
        return "status-checkin";

      case "DELAYED":
        return "status-delayed";

      case "LOST":
        return "status-lost";

      default:
        return "status-default";
    }
  };


  // ==========================================
  // FORMAT STATUS
  // ==========================================

  const formatStatus = (status) => {

    if (!status) {
      return "UNKNOWN";
    }

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );
  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDateTime = (dateTime) => {

    if (!dateTime) {
      return "N/A";
    }

    try {

      return new Date(
        dateTime
      ).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }
      );

    } catch {

      return dateTime;

    }
  };


  return (

    <div className="staff-layout">

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside className="staff-sidebar">

        <div className="staff-logo">

          <span>✈</span>

          <strong>
            BaggageTrack
          </strong>

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
            className="staff-nav-item active"
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


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="staff-main">

        {/* HEADER */}

        <header className="staff-header">

          <div>

            <h1>
              Baggage Management
            </h1>

            <p>
              Register baggage and monitor
              baggage records.
            </p>

          </div>


          <div className="staff-user">

            <div className="staff-avatar">
              S
            </div>

            <div>

              <strong>
                Staff
              </strong>

              <small>
                Airline Staff
              </small>

            </div>

          </div>

        </header>


        {/* =====================================
            ADD BAGGAGE
        ====================================== */}

        <section className="baggage-card add-baggage-card">

          <div className="baggage-card-header">

            <div>

              <h2>
                + Add New Baggage
              </h2>

              <p>
                Register baggage during
                passenger check-in.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleAddBaggage}
            className="add-baggage-form"
          >

            {/* PASSENGER */}

            <div className="baggage-form-group">

              <label htmlFor="passengerId">
                Passenger
              </label>

              <select
                id="passengerId"
                name="passengerId"
                value={formData.passengerId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Passenger
                </option>

                {passengers.map(
                  (passenger) => (

                    <option
                      key={passenger.id}
                      value={passenger.id}
                    >
                      {passenger.name ||
                        passenger.email}
                      {" - "}
                      {passenger.email}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* FLIGHT */}

            <div className="baggage-form-group">

              <label htmlFor="flightId">
                Flight
              </label>

              <select
                id="flightId"
                name="flightId"
                value={formData.flightId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Flight
                </option>

                {flights.map(
                  (flight) => (

                    <option
                      key={flight.id}
                      value={flight.id}
                    >
                      {flight.flightNumber}
                      {" - "}
                      {flight.source}
                      {" → "}
                      {flight.destination}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* WEIGHT */}

            <div className="baggage-form-group">

              <label htmlFor="weight">
                Weight (kg)
              </label>

              <input
                id="weight"
                name="weight"
                type="text"
                inputMode="decimal"
                placeholder="Enter baggage weight"
                value={formData.weight}
                onChange={(event) => {

                  const value =
                    event.target.value;

                  // Allow only numbers and one decimal point
                  if (
                    /^\d*\.?\d*$/.test(value)
                  ) {

                    setFormData({
                      ...formData,
                      weight: value
                    });

                  }

                }}
                required
              />

            </div>


            {/* BUTTON */}

            <div className="add-baggage-actions">

              <button
                type="submit"
                className="add-baggage-btn"
                disabled={adding}
              >

                {adding
                  ? "Adding..."
                  : "Add Baggage"}

              </button>

            </div>

          </form>


          {/* =================================
              MESSAGE
          ================================== */}

          {message && (

            <div className="baggage-success">

              <strong>
                ✓ {message}
              </strong>

            </div>

          )}


          {/* =================================
              GENERATED BAGGAGE ID
          ================================== */}

          {generatedBaggage && (

            <div className="generated-baggage">

              <div>

                <span>
                  Baggage Registered Successfully
                </span>

                <h3>
                  {generatedBaggage.tagId}
                </h3>

              </div>


              <div className="generated-details">

                <div>

                  <small>
                    Passenger
                  </small>

                  <strong>
                    {generatedBaggage.passenger?.name ||
                      generatedBaggage.passenger?.email ||
                      "N/A"}
                  </strong>

                </div>


                <div>

                  <small>
                    Flight
                  </small>

                  <strong>
                    {generatedBaggage.flight?.flightNumber ||
                      "N/A"}
                  </strong>

                </div>


                <div>

                  <small>
                    Weight
                  </small>

                  <strong>
                    {generatedBaggage.weight} kg
                  </strong>

                </div>


                <div>

                  <small>
                    Status
                  </small>

                  <strong>
                    {formatStatus(
                      generatedBaggage.status
                    )}
                  </strong>

                </div>

              </div>


              <p>
                Give this baggage ID to the
                passenger. It can be used for
                tracking and baggage validation.
              </p>

            </div>

          )}


          {/* =================================
              ERROR
          ================================== */}

          {error && (

            <div className="baggage-error">

              <strong>
                Unable to process baggage
              </strong>

              <p>
                {error}
              </p>

            </div>

          )}

        </section>


        {/* =====================================
            ALL BAGGAGE
        ====================================== */}

        <section className="baggage-card">

          <div className="baggage-card-header">

            <div>

              <h2>
                All Baggage
              </h2>

              <p>
                Current baggage records and
                their latest status.
              </p>

            </div>


            <button
              className="refresh-btn"
              onClick={fetchBaggage}
            >
              ↻ Refresh
            </button>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="baggage-message">
              Loading baggage records...
            </div>

          )}


          {/* ERROR */}

          {!loading &&
            error &&
            baggage.length === 0 && (

              <div className="baggage-error">

                <strong>
                  Unable to load baggage
                </strong>

                <p>
                  {error}
                </p>

                <button
                  className="refresh-btn"
                  onClick={fetchBaggage}
                >
                  Try Again
                </button>

              </div>

            )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            baggage.length === 0 && (

              <div className="baggage-message">
                No baggage records found.
              </div>

            )}


          {/* TABLE */}

          {!loading &&
            baggage.length > 0 && (

              <div className="baggage-table-wrapper">

                <table className="baggage-table">

                  <thead>

                    <tr>

                      <th>
                        ID
                      </th>

                      <th>
                        Tag ID
                      </th>

                      <th>
                        Flight
                      </th>

                      <th>
                        Passenger
                      </th>

                      <th>
                        Weight
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Created
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {baggage.map(
                      (item) => (

                        <tr key={item.id}>

                          <td>
                            #{item.id}
                          </td>


                          <td>

                            <strong className="tag-id">
                              {item.tagId}
                            </strong>

                          </td>


                          <td>
                            {item.flight?.flightNumber ||
                              "N/A"}
                          </td>


                          <td>
                            {item.passenger?.name ||
                              item.passenger?.email ||
                              "N/A"}
                          </td>


                          <td>
                            {item.weight} kg
                          </td>


                          <td>

                            <span
                              className={`status-badge ${getStatusClass(
                                item.status
                              )}`}
                            >
                              {formatStatus(
                                item.status
                              )}
                            </span>

                          </td>


                          <td>
                            {formatDateTime(
                              item.createdAt
                            )}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

        </section>

      </main>

    </div>
  );
}

export default Baggage;