import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Logo from "./find yours logo 1.png";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

function NavbarComponent() {


  function scrollToFindJob() {
    const element = document.getElementById("find-job");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function scrollToContact(event) {
    event.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Navbar fluid rounded className="custom-navbar">
      <NavbarBrand>
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active className="navbar-link">
          <Link to="/home">Home</Link>
        </NavbarLink>
        <NavbarLink
          href="#"
          className="navbar-link"
          onClick={scrollToFindJob}
        >
          Find Job
        </NavbarLink>
        <NavbarLink href="#" className="navbar-link" onClick={scrollToContact}>
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavbarComponent;
