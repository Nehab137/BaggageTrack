import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ManageBaggage() {
  const [baggage, setBaggage] = useState([]);

  useEffect(() => {
    fetchBaggage();
  }, []);

  const fetchBaggage = async () => {
    try {
      const response = await API.get("/admin/baggage");
      setBaggage(response.data);
    } catch (error) {
      console.error("Error fetching baggage:", error);
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
      <h1 style={{ color: "#102a43" }}>Manage Baggage</h1>

      <p style={{ color: "#64748b" }}>
        View and monitor all baggage in the system.
      </p>

      <div
        style={{
          marginTop: "25px",
          overflowX: "auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#e8efff" }}>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Baggage Tag</th>
              <th style={cellStyle}>Passenger</th>
              <th style={cellStyle}>Flight</th>
              <th style={cellStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {baggage.map((bag) => (
              <tr key={bag.id}>
                <td style={cellStyle}>{bag.id}</td>

                <td style={cellStyle}>
                  {bag.tagId || bag.tag_id || "-"}
                </td>

                <td style={cellStyle}>
                  {bag.passenger?.name || "-"}
                </td>

                <td style={cellStyle}>
                  {bag.flight?.flightNumber || "-"}
                </td>

                <td style={cellStyle}>
                  {bag.status || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

export default ManageBaggage;