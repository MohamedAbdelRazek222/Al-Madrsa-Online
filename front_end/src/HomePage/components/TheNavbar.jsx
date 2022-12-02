import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../assets/logoE.png";
import jwt_decode from "jwt-decode";
export default function TheNavbar() {
    const navigate= useNavigate()

    const token= sessionStorage.getItem("token")
    if (token){
        const decoded = jwt_decode(token);
        var {id,role}=decoded
    }
     const  signOut= ()=>{
        sessionStorage.removeItem("token")
        navigate("/")
     }
  return (
    <>
      <Navbar collapseOnSelect className="headerOne" expand="lg" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto inline-block px-2 py-2 border-2 border-black-600 text-green-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5  hover:text-red-600 hover:border-blue-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                { id ? <button onClick={signOut} className="nav-link" to="/auth">Sign out</button> :   <NavLink className="nav-link" to="/auth">Sign In</NavLink>  }
                {/* <NavLink className="nav-link" to="/auth">Sign In</NavLink>  */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar
        collapseOnSelect
        className="headerTwo"
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img className="h-20" src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className="buttons nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="buttons nav-link" to="/courses">
                Courses
              </NavLink>
              <NavLink className="buttons nav-link" to="/about">
                About Us
              </NavLink>
              <NavLink className="buttons nav-link" to="/contact-us">
                Contact Us
              </NavLink>
            </Nav>
            <Nav>
                {Boolean(id) ||
            <NavLink
                className="nav-link registerBtn text-light p-3 rounded hover:opacity-95 transtion"
                to="/auth"
              >
                Regester Now
              </NavLink>

                 }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
