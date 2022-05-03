/*
This is a component for the navigation bar
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { Button } from "./Button";
import "./css_files/Navbar.css";

export default function NavBar(props) {
  const [id, setID] = useState(null);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");
    setID(user_id);
    setUserName(user_name);
    console.log(user_id);
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo that shows up on the left */}
          <Link to="/" className="navbar-logo">
            FeedMeDB&nbsp; <i className="fa-solid fa-utensils" />
          </Link>

          {/* These are the buttons that show up on the right */}
          <ul className={"nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-links">
                Search
              </Link>
            </li>
          </ul>
          {id === null || id === "null" ? (
            <Button buttonStyle="btn--outline" link="login">
              Login
            </Button>
          ) : (
            <AccountMenu user={userName} />
          )}
        </div>
      </nav>
    </>
  );
}
