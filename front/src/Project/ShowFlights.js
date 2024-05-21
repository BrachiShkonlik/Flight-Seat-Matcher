import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { Navbar1 } from '../Project/Navbar1';
import { setPassenger } from '../Redux/Actions/passengerAction';
import FlightCard from './FlightCard';
import '../Styles/ShowFlight.css';

const ShowFlights = () => {
    const passenger = useSelector((state) => state.passengerReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editableFlight, setEditableFlight] = useState(null);
    const [editedFlight, setEditedFlight] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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

    const editPass = async (data) => {
        let url = `http://localhost:5170/api/PassengerWithFlight/updateFlight`;
        data.flightRegistration.flightCode = editableFlight;
        data.flightRegistration.preferred = editedFlight.preferred;
        data.flightRegistration.favoriteSomeoneFirstName = editedFlight.favoriteSomeoneFirstName;
        data.flightRegistration.favoriteSomeoneLastName = editedFlight.favoriteSomeoneLastName;
        data.user = {};
        data.user.password = passenger.password;
        data.user.email = passenger.email;
        data.user.flightCode = editableFlight;
        await axios.post(url, data)
            .then(async (response) => {
                setIsUpdated(response.data);
                setSuccessMessage('Edit successful!');
                url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
                data = {};
                data.password = passenger.password;
                data.email = passenger.email;
                setTimeout(async function() {
                    await axios.post(url, data)
                        .then((response) => {
                            if (response.data.length !== 0) {
                                dispatch(setPassenger(response.data));
                            }
                            navigate("/show-flights");
                        })
                }, 700);
            }).catch((error) => {
                if (error.response.status === 400) navigate("/error400");
                if (error.response.status === 500) navigate("/error500");
            });
    };

    const handleEditClick = (flight) => {
        setEditableFlight(flight.flightCode);
        setEditedFlight(flight);
    };

    const handleSaveClick = async (flightCode) => {
        const data = {
            flightRegistration: {
                ...editedFlight
            }
        };
        await editPass(data);
        setEditableFlight(null);
    };

    const handleInputChange = (e, field) => {
        setEditedFlight({ ...editedFlight, [field]: e.target.textContent });
    };

    return (
        <>
            <Navbar1 />
            <div className="container">
                <main className="main-content">
                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}
                    {passenger.flightsRegistration.length === 0 ? (
                        <div id="noFlights">
                            <h1><br /></h1>
                            <h1 id="noFlightsText">אופסס, אין לך טיסות במאגר</h1>
                            <h1 id="Oops button">?רוצה <span className="add" onClick={() => navigate("/add-flight")}>להוסיף</span> טיסה</h1>
                        </div>
                    ) : (
                        <div>
                            {passenger.flightsRegistration.map((p) => (
                                <FlightCard
                                    key={p.flightCode}
                                    flight={p}
                                    editable={editableFlight === p.flightCode}
                                    onDelete={deletePass}
                                    onEdit={handleEditClick}
                                    onSave={handleSaveClick}
                                    onInputChange={handleInputChange}
                                />
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
};

export default ShowFlights;
