import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ManageUsers() {

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PASSENGER"
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);


  // ==========================================
  // FETCH USERS
  // ==========================================

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {

    try {

      const response =
        await API.get("/admin/users");

      setUsers(response.data || []);

    } catch (error) {

      console.error(
        "Error fetching users:",
        error
      );

      setError(
        "Unable to load users."
      );
    }
  };


  // ==========================================
  // HANDLE INPUT
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
  // CREATE USER
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");

    // Basic validation

    if (!formData.name.trim()) {

      setError(
        "Please enter the user's name."
      );

      return;
    }


    if (!formData.email.trim()) {

      setError(
        "Please enter the user's email."
      );

      return;
    }


    if (!formData.password) {

      setError(
        "Please enter a password."
      );

      return;
    }


    setAdding(true);

    try {

      const response =
        await API.post(
          "/admin/users",
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: formData.role
          }
        );


      const createdUser =
        response.data;


      setMessage(
        `User created successfully: ${
          createdUser.name
        } (${createdUser.role})`
      );


      // Clear form

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "PASSENGER"
      });


      // Reload users

      await fetchUsers();

    } catch (error) {

      console.error(
        "Error creating user:",
        error
      );

      if (error.response) {

        const data =
          error.response.data;

        if (typeof data === "string") {

          setError(data);

        } else {

          setError(
            data?.message ||
            "Unable to create user."
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
  // DELETE USER
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmed) {
      return;
    }


    try {

      await API.delete(
        `/admin/users/${id}`
      );

      setMessage(
        "User deleted successfully."
      );

      setError("");

      await fetchUsers();

    } catch (error) {

      console.error(
        "Error deleting user:",
        error
      );

      setError(
        "Unable to delete user."
      );

    }
  };


  return (

    <div className="manage-users-page">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="users-page-header">

        <div>

          <h1>
            Manage Users
          </h1>

          <p>
            Create and manage BaggageTrack users.
          </p>

        </div>

      </div>


      {/* =====================================
          ADD USER CARD
      ====================================== */}

      <div className="add-user-card">

        <h2>
          + Add New User
        </h2>

        <p className="add-user-description">
          Admin can create Passenger, Staff,
          or Admin accounts.
        </p>


        <form
          onSubmit={handleSubmit}
          className="add-user-form"
        >

          {/* NAME */}

          <div className="user-form-group">

            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="user-form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="user-form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* ROLE */}

          <div className="user-form-group">

            <label htmlFor="role">
              Role
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option value="PASSENGER">
                Passenger
              </option>

              <option value="STAFF">
                Staff
              </option>

              <option value="ADMIN">
                Admin
              </option>

            </select>

          </div>


          {/* BUTTON */}

          <div className="user-form-actions">

            <button
              type="submit"
              className="create-user-btn"
              disabled={adding}
            >

              {adding
                ? "Creating..."
                : "Create User"}

            </button>

          </div>

        </form>


        {/* SUCCESS */}

        {message && (

          <div className="user-success">
            ✓ {message}
          </div>

        )}


        {/* ERROR */}

        {error && (

          <div className="user-error">
            ⚠ {error}
          </div>

        )}

      </div>


      {/* =====================================
          USERS TABLE
      ====================================== */}

      <div className="users-table-card">

        <div className="users-table-header">

          <div>

            <h2>
              All Users
            </h2>

            <p>
              Registered BaggageTrack accounts.
            </p>

          </div>


          <button
            className="refresh-users-btn"
            onClick={fetchUsers}
          >
            ↻ Refresh
          </button>

        </div>


        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {users.length > 0 ? (

                users.map((user) => (

                  <tr key={user.id}>

                    <td>
                      #{user.id}
                    </td>

                    <td>
                      {user.name || "N/A"}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>

                      <span
                        className={`role-badge role-${user.role?.toLowerCase()}`}
                      >
                        {user.role}
                      </span>

                    </td>

                    <td>

                      <button
                        className="delete-user-btn"
                        onClick={() =>
                          handleDelete(user.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="no-users"
                  >
                    No users found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageUsers;