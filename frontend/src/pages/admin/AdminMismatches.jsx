import React, { useEffect, useState } from "react";
import API from "../../services/api";

function AdminMismatches() {
  const [mismatches, setMismatches] = useState([]);

  useEffect(() => {
    fetchMismatches();
  }, []);

  const fetchMismatches = async () => {
    try {
      const response = await API.get("/admin/mismatches");
      setMismatches(response.data);
    } catch (error) {
      console.error("Error fetching mismatches:", error);
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
      <h1 style={{ color: "#102a43" }}>Baggage Mismatches</h1>

      <p style={{ color: "#64748b" }}>
        Review baggage flight mismatches detected by the system.
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
            <tr style={{ background: "#ffe8e8" }}>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Baggage Tag</th>
              <th style={cellStyle}>Expected Flight</th>
              <th style={cellStyle}>Scanned Flight</th>
              <th style={cellStyle}>Location</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Reason</th>
            </tr>
          </thead>

          <tbody>
            {mismatches.map((item) => (
              <tr key={item.id}>
                <td style={cellStyle}>{item.id}</td>

                <td style={cellStyle}>
                  {item.tagId || item.tag_id || "-"}
                </td>

                <td style={cellStyle}>
                  {item.expectedFlight || "-"}
                </td>

                <td style={cellStyle}>
                  {item.scannedFlight || "-"}
                </td>

                <td style={cellStyle}>
                  {item.location || "-"}
                </td>

                <td style={cellStyle}>
                  {item.status || "-"}
                </td>

                <td style={cellStyle}>
                  {item.reason || item.remarks || "-"}
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

export default AdminMismatches;