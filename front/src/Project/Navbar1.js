import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../Styles/Navbar.css';
import logo from '../Project/Imgs/Logo.jpg';

export function Navbar1() {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div className="logo-container" onClick={() => navigate("/home-page")}>
        <img src={logo} className="logo" alt="logo" />
        <span className="site-name">Fly High</span>
      </div>
      <Nav className='mainNavigation' dir='rtl'>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/home-page")}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/flights")}>Flights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/seats")}>Seats</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/about-us")}>About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/deals")}>Deals</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="search-container">
        <input type="text" placeholder="Search flights..." />
      </div>
    </div>
  );
}
