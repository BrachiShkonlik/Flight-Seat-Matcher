import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Navbar1 } from '../Project/Navbar1';
import Button from 'react-bootstrap/Button';
import { GrEdit } from "react-icons/gr";
import '../Styles/ShowFlight.css';
import { setPassenger } from '../Redux/Actions/passengerAction';

function ShowFlights() {
    const passenger = useSelector((state) => state.passengerReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataToTransfer = {};
    dataToTransfer.flightRegistration = {};
    dataToTransfer.userData = {};

    useEffect(() => {
        document.title = 'הטיסות שלי';
    }, []);

    const deletePass = async (data) => {
        const newData = {
            password: passenger.password,
            email: passenger.email,
            flightCode: data.flightCode
        };
        let url = `http://localhost:5170/api/PassengerWithFlight/removeFlight`;
        await axios.post(url, newData)
            .then(async (response) => {
                if (response.data === true) {
                    url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
                    data = {
                        password: passenger.password,
                        email: passenger.email
                    };
                    await axios.post(url, data)
                        .then((response) => {
                            if (response.data.length !== 0) {
                                dispatch(setPassenger(response.data));
                            }
                        });
                    navigate("/show-flights");
                }
            }).catch((error) => {
                if (error.response.status === 400) navigate("/error400");
                if (error.response.status === 500) navigate("/error500");
            });
    };

    return (
        <>
            <Navbar1 />
            <div className="container">
                <main className="main-content">
                    {passenger.flightsRegistration.length === 0 ? (
                        <div id="noFlights">
                            <h1><br /></h1>
                            <h1 id="noFlightsText">אופסס, אין לך טיסות במאגר</h1>
                            <h1 id="Oops button">?רוצה <span className="add" onClick={() => navigate("/add-flight")}>להוסיף</span> טיסה</h1>
                        </div>
                    ) : (
                        <div>
                            {passenger.flightsRegistration.map((p) => (
                                <div key={p.flightCode} className="flight-card">
                                    <div className="flight-info">
                                        <p>{p.flight.exit} to {p.flight.target}</p>
                                        <p>Departure: {p.flight.date}</p>
                                    </div>
                                    <div className="seat-info">
                                        <p>Seat {p.seat}</p>
                                        {p.favoriteSomeoneFirstName || p.favoriteSomeoneLastName ? (
                                            <p>אני רוצה לשבת ליד {p.favoriteSomeoneFirstName} {p.favoriteSomeoneLastName}</p>
                                        ) : null}
                                        {p.preferred ? (
                                            <p>אני רוצה {p.preferred}</p>
                                        ) : null}
                                    </div>
                                    <div className="flight-time">
                                        <Button variant="light" data-mdb-toggle="tooltip" title="מחיקת הטיסה" onClick={() => deletePass(p)}>
                                            <FiTrash2 className="trashButton" />
                                        </Button>
                                        <Button variant="light" data-mdb-toggle="tooltip" title="עריכה" onClick={() => {
                                            dataToTransfer.flightRegistration = p;
                                            dataToTransfer.userData = passenger;
                                            navigate('/edit--', { state: dataToTransfer });
                                        }}>
                                            <GrEdit />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div className="container">
                                <a className="plusBtn" onClick={() => navigate("/add-flight")}>
                                    <div className="plusBtn__line"></div>
                                    <div className="plusBtn__line"></div>
                                    <span className="plusBtn__text"><FaPlus /></span>
                                    <div className="plusBtn__drow1"></div>
                                    <div className="plusBtn__drow2"></div>
                                </a>
                            </div>
                        </div>
                    )}
                </main>
                <aside className="sidebar">
                    <div className="profile">
                        <div className="profile-pic">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="profile-info">
                            <h2>John Doe</h2>
                            <p>Upcoming Flights</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="total-flights">Total Flights: {passenger.flightsRegistration.length}</button>
                        <button className="manage-trips" onClick={() => navigate("/manage-trips")}>Manage Trips</button>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default ShowFlights;
