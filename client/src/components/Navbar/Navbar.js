import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import "./Navbar.css";

// NavLink adds "active" to className when path matches.

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const links = [];

  if (isLoggedIn) {
  links.push(
    <NavLink key="chat" className="nav-item" to="/chat">
      Chat
      </NavLink>
  );
  links.push(
    <NavLink key="qrcodes" className="nav-item" to="/qrcodes">
      Print QR Codes
      </NavLink>
  );
  links.push(
    <span key="logout" className="nav-item" onClick={logout}>
      Logout
      </span>
  );
  } else {
    links.push(
      <NavLink key="signup" className="nav-item" to="/signup">
        Sign Up
      </NavLink>
    );
    links.push(
      <NavLink key="login" className="nav-item" to="/login">
        Login
      </NavLink>
    );
  }
  
  return <nav className="Navbar">{links}</nav>;
}

export default Navbar;
