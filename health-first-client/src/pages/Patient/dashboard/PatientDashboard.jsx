import React from 'react';
import './PatientDashboard.css';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, John Doe 👋</h1>
        <p>Your health, our priority.</p>
        <nav>
          <Link to="/appointments">Appointments</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>Upcoming Appointment</h2>
          <div className="card">
            <p><strong>Date:</strong> 10-Aug-2025</p>
            <p><strong>Time:</strong> 10:30 AM</p>
            <p><strong>Doctor:</strong> Dr. Smith</p>
            <button className="btn-primary">View Details</button>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Visits</h2>
          <ul className="visit-list">
            <li>✔️ 05-Jul-2025 — General Checkup</li>
            <li>✔️ 20-Jun-2025 — Dental Consultation</li>
          </ul>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} HealthFirst. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;
