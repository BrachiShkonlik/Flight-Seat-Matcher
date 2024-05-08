import Nav from 'react-bootstrap/Nav';
// import 'bootstrap/dist/css/bootstrap.min.css'; // unidentified
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import { BsChatRightText } from "react-icons/bs"; // no in useing
// import forAbout from '../Redux/Pictures/forAbout.jpg'; // unidentified
import { IoPerson } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import '../Styles/Navbar.css';
import logo from '../Project/Imgs/Logo.jpg';
import { FaPlus } from "react-icons/fa";


export function Navbar1() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Nav className='mainNavigation sticky-nav' id="navbar" dir='rtl'>
        <>
          <Nav.Item>
            <Nav.Link onClick={() => { navigate("/home-page") }}><span class="tab1"></span>
              <img src={logo} className="logo"></img>
              <span class="tab"></span></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { navigate("/my-profile") }}><h5><IoPerson className='icon'></IoPerson></h5></Nav.Link>
          </Nav.Item>
          <div class="divider">||</div>
          <Nav.Item>
            <Nav.Link onClick={() => { /*navigate("/scheduler")*/ navigate("/a") }}><FiCalendar className='icon'></FiCalendar></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { navigate("/show-flights") }}><MdOutlineAirplaneTicket className='icon'></MdOutlineAirplaneTicket></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { navigate("/edit-personl-details") }}><VscTasklist className='icon'></VscTasklist></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { navigate("/add-flight") }}><FaPlus className='icon'></FaPlus></Nav.Link>
          </Nav.Item>

        </>
      </Nav>

    </>
  );
}