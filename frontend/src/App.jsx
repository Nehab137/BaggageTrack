import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PassengerDashboard from "./pages/passenger/PassengerDashboard";
import MyBaggage from "./pages/passenger/MyBaggage";
import TrackBaggage from "./pages/passenger/TrackBaggage";
import Notifications from "./pages/passenger/Notifications";
import Profile from "./pages/passenger/Profile";

import StaffDashboard from "./pages/staff/StaffDashboard";
import ScanBaggage from "./pages/staff/ScanBaggage";
import UpdateBaggageStatus from "./pages/staff/UpdateBaggageStatus";
import Baggage from "./pages/staff/Baggage";
import Mismatches from "./pages/staff/Mismatches";
import StaffProfile from "./pages/staff/StaffProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageFlights from "./pages/admin/ManageFlights";
import ManageBaggage from "./pages/admin/ManageBaggage";
import AdminMismatches from "./pages/admin/AdminMismatches";

import ProtectedRoute from "./ProtectedRoute";

import "./App.css";


// ==========================================
// LANDING PAGE
// ==========================================

function LandingPage() {
  return (
    <div className="landing-page">

      {/* ================================
          NAVBAR
      ================================= */}

      <nav className="navbar">

        <div className="logo">

          <span className="logo-icon">
            ✈
          </span>

          <span>
            BaggageTrack
          </span>

        </div>


        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#contact">
            Contact
          </a>

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* ================================
          HOME / HERO
      ================================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-overlay"></div>


        <div className="hero-content">

          <p className="hero-small-title">
            SMART BAGGAGE MANAGEMENT
          </p>


          <h1>
            Track Every
            <br />
            Baggage Journey
          </h1>


          <p className="hero-description">
            Smart baggage management for a safer,
            <br />
            smoother travel experience.
          </p>


          <Link
            to="/login"
            className="get-started-btn"
          >
            Get Started
            <span>
              →
            </span>
          </Link>


          {/* FEATURES */}

          <div className="features">

            <div className="feature">

              <span>
                ◷
              </span>

              <p>
                Real-Time Tracking
              </p>

            </div>


            <div className="feature">

              <span>
                ♢
              </span>

              <p>
                Secure Handling
              </p>

            </div>


            <div className="feature">

              <span>
                ✈
              </span>

              <p>
                Better Travel Experience
              </p>

            </div>

          </div>

        </div>


        {/* SIDE TEXT */}

        <div className="hero-side-text">

          FROM CHECK-IN
          <br />

          TO ARRIVAL
          <br />

          WE KEEP
          <br />

          IT ON TRACK.

          <div className="side-line"></div>

        </div>


        {/* BOTTOM TEXT */}

        <div className="hero-bottom-text">

          Because every bag has a story.

        </div>

      </section>


      {/* ================================
          ABOUT
      ================================= */}

      <section
        className="landing-section"
        id="about"
      >

        <div className="landing-section-content">

          <p className="section-small-title">
            ABOUT US
          </p>

          <h2>
            About BaggageTrack
          </h2>

          <p>
            BaggageTrack is a smart baggage management system
            designed to make baggage tracking easier, safer
            and more transparent.
          </p>

          <p>
            Passengers can track their baggage journey,
            airline staff can validate and update baggage
            status, and administrators can monitor the
            complete system.
          </p>

        </div>

      </section>


      {/* ================================
          SERVICES
      ================================= */}

      <section
        className="landing-section services-section"
        id="services"
      >

        <div className="landing-section-content">

          <p className="section-small-title">
            OUR SERVICES
          </p>

          <h2>
            What We Provide
          </h2>


          <div className="service-cards">

            {/* SERVICE 1 */}

            <div className="service-card">

              <div className="service-icon">
                ✈
              </div>

              <h3>
                Real-Time Tracking
              </h3>

              <p>
                Track your baggage through different
                stages of its journey.
              </p>

            </div>


            {/* SERVICE 2 */}

            <div className="service-card">

              <div className="service-icon">
                ✓
              </div>

              <h3>
                Flight Validation
              </h3>

              <p>
                Verify baggage against the correct
                flight and detect mismatches.
              </p>

            </div>


            {/* SERVICE 3 */}

            <div className="service-card">

              <div className="service-icon">
                🔔
              </div>

              <h3>
                Instant Notifications
              </h3>

              <p>
                Receive updates whenever your
                baggage status changes.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          CONTACT
      ================================= */}

      <section
        className="landing-section contact-section"
        id="contact"
      >

        <div className="landing-section-content">

          <p className="section-small-title">
            CONTACT
          </p>

          <h2>
            Contact Us
          </h2>

          <p>
            Have questions about BaggageTrack?
            We are here to help.
          </p>

          <div className="contact-info">

            <p>
              📧 support@baggagetrack.com
            </p>

            <p>
              📞 +91 90000 00000
            </p>

            <p>
              📍 Hyderabad, India
            </p>

          </div>

        </div>

      </section>


      {/* ================================
          FOOTER
      ================================= */}

      <footer className="landing-footer">

        <p>
          © 2026 BaggageTrack. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}


// ==========================================
// MAIN APP
// ==========================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ==================================
            PUBLIC ROUTES
        =================================== */}

        <Route
          path="/"
          element={
            <LandingPage />
          }
        />


        <Route
          path="/login"
          element={
            <Login />
          }
        />


        <Route
          path="/register"
          element={
            <Register />
          }
        />


        {/* ==================================
            PASSENGER ROUTES
        =================================== */}

        <Route
          path="/passenger"
          element={
            <ProtectedRoute allowedRole="PASSENGER">
              <PassengerDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/passenger/baggage"
          element={
            <ProtectedRoute allowedRole="PASSENGER">
              <MyBaggage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/passenger/track"
          element={
            <ProtectedRoute allowedRole="PASSENGER">
              <TrackBaggage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/passenger/notifications"
          element={
            <ProtectedRoute allowedRole="PASSENGER">
              <Notifications />
            </ProtectedRoute>
          }
        />


        <Route
          path="/passenger/profile"
          element={
            <ProtectedRoute allowedRole="PASSENGER">
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            STAFF ROUTES
        =================================== */}

        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRole="STAFF">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/staff/scan"
          element={
            <ProtectedRoute allowedRole="STAFF">
              <ScanBaggage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/staff/update-status"
          element={
            <ProtectedRoute allowedRole="STAFF">
              <UpdateBaggageStatus />
            </ProtectedRoute>
          }
        />


        <Route
          path="/staff/baggage"
          element={
            <ProtectedRoute allowedRole="STAFF">
              <Baggage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/staff/mismatches"
          element={
            <ProtectedRoute allowedRole="STAFF">
              <Mismatches />
            </ProtectedRoute>
          }
        />


        <Route
          path="/staff/profile"
          element={
            <ProtectedRoute allowedRole="STAFF">
              <StaffProfile />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            ADMIN ROUTES
        =================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ManageUsers />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/flights"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ManageFlights />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/baggage"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ManageBaggage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/mismatches"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminMismatches />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;