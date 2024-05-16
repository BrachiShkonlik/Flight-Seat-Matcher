import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Navbar1 } from './Navbar1';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPassenger } from '../Redux/Actions/passengerAction';

function FindSeatmate() {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [seatmateFirstName, setSeatmateFirstName] = useState('');
    const [seatmateLastName, setSeatmateLastName] = useState('');
    const [seatmateHobby, setSeatmateHobby] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passenger = useSelector((state) => state.passengerReducer);

    useEffect(() => {
        // Fetch flights data from your API
        const getFlights = async () => {
            try {
                const response = await axios.get('http://localhost:5170/api/Flights');
                setFlights(response.data.map(flight => ({
                    value: flight.flightCode,
                    label: `${flight.exit} to ${flight.target}, ${flight.company}`
                })));
            } catch (error) {
                console.error('Error fetching flights data', error);
            }
        };

        getFlights();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newData = {
            flightRegistration: {
                flightCode: selectedFlight.value,
                preferred: seatmateHobby ? seatmateHobby.label : 'כל תחביב',
                favoriteSomeoneFirstName: seatmateFirstName,
                favoriteSomeoneLastName: seatmateLastName,
            },
            user: {
                password: passenger.password,
                email: passenger.email,
            }
        };

        try {
            // Checking if the flight already exists
            let url = `http://localhost:5170/api/PassengerWithFlight/checking`;
            const checkResponse = await axios.post(url, {
                flightCode: selectedFlight.value,
                password: passenger.password,
                email: passenger.email
            });

            if (checkResponse.data === true) {
                // Add the flight
                url = `http://localhost:5170/api/PassengerWithFlight/addFlight`;
                await axios.post(url, newData);
                alert("הטיסה נוספה בהצלחה");

                // Fetch updated passenger information
                url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
                const passengerResponse = await axios.post(url, {
                    flightCode: selectedFlight.value,
                    password: passenger.password,
                    email: passenger.email
                });

                dispatch(setPassenger(passengerResponse.data));
                navigate("/show-flights");
            } else {
                alert("אופסס...\n הטיסה הזו כבר רשומה במערכת");
            }
        } catch (error) {
            if (error.response.status === 400) navigate("/error400");
            if (error.response.status === 500) navigate("/error500");
        }
    };

    return (
        <>
            <Navbar1 />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(193, 218, 237, 0.46)' }}>
                <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ color: 'rgb(13, 87, 255)', textAlign: 'center' }}>מצא את שותפך המושלם למושב</h1>
                    <p style={{ color: 'rgb(13, 87, 255)', textAlign: 'center' }}>מצא מישהו שחולק את הגיל והתחביבים שלך בטיסה.</p>

                    <div style={{ marginBottom: '20px' }}>
                        <label>בחר טיסה</label>
                        <Select
                            options={flights}
                            onChange={setSelectedFlight}
                            placeholder="בחר טיסה"
                            styles={{ control: (provided) => ({ ...provided, marginTop: '8px' }) }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>הכנס שם פרטי של שותף מועדף</label>
                        <input
                            type="text"
                            value={seatmateFirstName}
                            onChange={(e) => setSeatmateFirstName(e.target.value)}
                            placeholder="הכנס שם פרטי של שותף"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '8px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>הכנס שם משפחה של שותף מועדף</label>
                        <input
                            type="text"
                            value={seatmateLastName}
                            onChange={(e) => setSeatmateLastName(e.target.value)}
                            placeholder="הכנס שם משפחה של שותף"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '8px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>תחביב מועדף בטיסה</label>
                        <Select
                            options={[
                                { value: 'any', label: 'כל תחביב' },
                                { value: 'reading', label: 'קריאה' },
                                { value: 'knitting', label: 'סריגה' },
                                { value: 'watching movies', label: 'צפייה בסרטים' },
                                { value: 'sleeping', label: 'שינה' },
                                { value: 'working', label: 'עבודה' }
                            ]}
                            onChange={setSeatmateHobby}
                            placeholder="כל תחביב"
                            styles={{ control: (provided) => ({ ...provided, marginTop: '8px' }) }}
                        />
                    </div>

                    <button type="submit" style={{ width: '100%', backgroundColor: 'rgb(13, 87, 255)', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
                        מצא את שותפי למושב
                    </button>
                </form>
            </div>
        </>
    );
}

export default FindSeatmate;
