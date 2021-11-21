import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import img from "../images/doctor8.jpg";
import img1 from "./doctor_1.png";

function AuthNav() {
  if (Auth.loggedIn() && Auth.isRole("User")) {
    return (
      <>
        <ul>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>

          <li className="mx-1">
            <a href="/userAppointments">My Appointments </a>
          </li>

          <li className="mx-1">
            <a href="/appointment">Book Appointment</a>
          </li>
        </ul>
      </>
    );
  } else if (Auth.loggedIn() && Auth.isRole("Doctor")) {
    return (
      <>
        <ul>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="mx-1">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="mx-1">
            <a href="/me">MyAppointments</a>
          </li>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>

          <li className="mx-1">
            <Link to="/signupdoc">SignupDoctor</Link>
          </li>
          <li className="mx-1">
            <Link to="/logindoc">LoginDoctor</Link>
          </li>
        </ul>
      </>
    );
  }
}

function Nav() {
  return (
    <header className="flex-row px-1">
      <h1 className="center">
        <Link to="/">
          <p>
            <Link className="nav-logo" to="/">
              Medconnect360
              <img
                className="nav-log-img"
                style={{ width: "3.2rem" }}
                src={img1}
              />
            </Link>
          </p>
        </Link>
      </h1>

      <nav>{AuthNav()}</nav>
    </header>
  );
}

export default Nav;
