import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ManageFlights() {

  const [flights, setFlights] = useState([]);

  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);


  // =========================
  // LOAD FLIGHTS
  // =========================

  useEffect(() => {
    fetchFlights();
  }, []);


  const fetchFlights = async () => {

    try {

      const response = await API.get("/admin/flights");

      setFlights(response.data || []);

      setError("");

    } catch (err) {

      console.error("Error fetching flights:", err);

      setError("Unable to load flights.");

    }
  };


  // =========================
  // FORMAT DATE & TIME
  // =========================

  const formatDateTime = (dateTime) => {

    if (!dateTime) {
      return "N/A";
    }

    try {

      return new Date(dateTime).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    } catch {

      return dateTime;

    }
  };


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // =========================
  // ADD FLIGHT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setAdding(true);


    // Make sure arrival is after departure
    if (
      formData.departureTime &&
      formData.arrivalTime &&
      new Date(formData.arrivalTime) <=
        new Date(formData.departureTime)
    ) {

      setError(
        "Arrival time must be later than departure time."
      );

      setAdding(false);

      return;
    }


    try {

      await API.post("/flights", {

        flightNumber:
          formData.flightNumber.trim(),

        airline:
          formData.airline.trim(),

        source:
          formData.source.trim(),

        destination:
          formData.destination.trim(),

        departureTime:
          formData.departureTime,

        arrivalTime:
          formData.arrivalTime,

      });


      setMessage(
        "Flight added successfully!"
      );


      // Clear form
      setFormData({
        flightNumber: "",
        airline: "",
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
      });


      // Reload flights
      await fetchFlights();

    } catch (err) {

      console.error(
        "Error adding flight:",
        err
      );

      if (err.response) {

        setError(
          `Unable to add flight. Server returned ${err.response.status}.`
        );

      } else {

        setError(
          "Unable to connect to the server."
        );

      }

    } finally {

      setAdding(false);

    }

  };


  return (

    <div
      style={{
        padding: "30px",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >


      {/* =========================
          PAGE TITLE
      ========================== */}

      <h1
        style={{
          color: "#102a43",
          marginBottom: "5px",
        }}
      >
        Manage Flights
      </h1>


      <p
        style={{
          color: "#64748b",
          fontSize: "17px",
        }}
      >
        Add, view and manage BaggageTrack
        flight information.
      </p>



      {/* =========================
          ADD FLIGHT FORM
      ========================== */}

      <div
        style={{
          marginTop: "25px",
          background: "white",
          padding: "28px",
          borderRadius: "14px",
          boxShadow:
            "0 5px 18px rgba(0,0,0,0.08)",
        }}
      >


        <h2
          style={{
            color: "#102a43",
            marginBottom: "22px",
          }}
        >
          + Add New Flight
        </h2>


        <form onSubmit={handleSubmit}>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: "20px",
            }}
          >


            {/* Flight Number */}

            <div>

              <label style={labelStyle}>
                Flight Number
              </label>

              <input
                type="text"
                name="flightNumber"
                placeholder="Example: AI450"
                value={
                  formData.flightNumber
                }
                onChange={handleChange}
                required
                style={inputStyle}
              />

            </div>



            {/* Airline */}

            <div>

              <label style={labelStyle}>
                Airline
              </label>

              <input
                type="text"
                name="airline"
                placeholder="Example: Air India"
                value={
                  formData.airline
                }
                onChange={handleChange}
                required
                style={inputStyle}
              />

            </div>



            {/* Source */}

            <div>

              <label style={labelStyle}>
                Source
              </label>

              <input
                type="text"
                name="source"
                placeholder="Example: Hyderabad"
                value={
                  formData.source
                }
                onChange={handleChange}
                required
                style={inputStyle}
              />

            </div>



            {/* Destination */}

            <div>

              <label style={labelStyle}>
                Destination
              </label>

              <input
                type="text"
                name="destination"
                placeholder="Example: Mumbai"
                value={
                  formData.destination
                }
                onChange={handleChange}
                required
                style={inputStyle}
              />

            </div>



            {/* Departure */}

            <div>

              <label style={labelStyle}>
                Departure Time
              </label>

              <input
                type="datetime-local"
                name="departureTime"
                value={
                  formData.departureTime
                }
                onChange={handleChange}
                required
                style={inputStyle}
              />

            </div>



            {/* Arrival */}

            <div>

              <label style={labelStyle}>
                Arrival Time
              </label>

              <input
                type="datetime-local"
                name="arrivalTime"
                value={
                  formData.arrivalTime
                }
                onChange={handleChange}
                required
                style={inputStyle}
              />

            </div>

          </div>



          {/* Add button */}

          <button
            type="submit"
            disabled={adding}
            style={{
              marginTop: "24px",
              padding: "13px 26px",
              border: "none",
              borderRadius: "8px",
              background: adding
                ? "#94a3b8"
                : "#2563eb",
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              cursor: adding
                ? "not-allowed"
                : "pointer",
            }}
          >

            {adding
              ? "Adding Flight..."
              : "Add Flight"}

          </button>


        </form>



        {/* SUCCESS */}

        {message && (

          <div
            style={{
              marginTop: "16px",
              padding: "13px",
              borderRadius: "8px",
              background: "#dcfce7",
              color: "#166534",
              fontWeight: "500",
            }}
          >

            ✅ {message}

          </div>

        )}



        {/* ERROR */}

        {error && (

          <div
            style={{
              marginTop: "16px",
              padding: "13px",
              borderRadius: "8px",
              background: "#fee2e2",
              color: "#991b1b",
              fontWeight: "500",
            }}
          >

            ❌ {error}

          </div>

        )}

      </div>



      {/* =========================
          FLIGHT TABLE
      ========================== */}

      <div
        style={{
          marginTop: "30px",
          overflowX: "auto",
          background: "white",
          borderRadius: "14px",
          boxShadow:
            "0 5px 18px rgba(0,0,0,0.08)",
        }}
      >


        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >


          <thead>

            <tr
              style={{
                background: "#e8efff",
              }}
            >

              <th style={cellStyle}>
                ID
              </th>

              <th style={cellStyle}>
                Flight Number
              </th>

              <th style={cellStyle}>
                Airline
              </th>

              <th style={cellStyle}>
                Source
              </th>

              <th style={cellStyle}>
                Destination
              </th>

              <th style={cellStyle}>
                Departure
              </th>

              <th style={cellStyle}>
                Arrival
              </th>

            </tr>

          </thead>



          <tbody>


            {flights.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    padding: "25px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No flights available.
                </td>

              </tr>

            ) : (


              flights.map((flight) => (

                <tr key={flight.id}>


                  <td style={cellStyle}>
                    {flight.id}
                  </td>


                  <td
                    style={{
                      ...cellStyle,
                      fontWeight: "600",
                    }}
                  >
                    {flight.flightNumber}
                  </td>


                  <td style={cellStyle}>
                    {flight.airline}
                  </td>


                  <td style={cellStyle}>
                    {flight.source}
                  </td>


                  <td style={cellStyle}>
                    {flight.destination}
                  </td>


                  <td style={cellStyle}>
                    {formatDateTime(
                      flight.departureTime
                    )}
                  </td>


                  <td style={cellStyle}>
                    {formatDateTime(
                      flight.arrivalTime
                    )}
                  </td>


                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}


/* =========================
   STYLES
========================= */

const labelStyle = {

  display: "block",

  marginBottom: "7px",

  fontWeight: "600",

  color: "#334e68",

};


const inputStyle = {

  width: "100%",

  padding: "12px",

  border:
    "1px solid #cbd5e1",

  borderRadius: "8px",

  fontSize: "15px",

  boxSizing: "border-box",

};


const cellStyle = {

  padding: "14px",

  borderBottom:
    "1px solid #ddd",

  textAlign: "left",

  color: "#102a43",

};


export default ManageFlights;