import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { Navbar1 } from "./Navbar1";
import '../Styles/App.css';
import { setPassenger } from '../Redux/Actions/passengerAction';

export default function EditDetails() {
    useEffect(() => {
        document.title = 'עריכת פרטים';
    }, []);

    const user = useSelector((state) => state.passengerReducer);
    const dispatch = useDispatch();
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstName: yup.string().required("Your name is required"),
        lastName: yup.string().required("Your name is required"),
        phoneNumber: yup.string().required("Your phone number is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        apdateUser(data);
    };

    const apdateUser = async (data) => {
        data.password = user.password;
        data.email = user.email;
        data.birthday = user.birthday;
        data.flightsRegistration = user.flightsRegistration;
        data.gander = user.gander;

        let url = `http://localhost:5170/api/PassengerWithFlight`;

        try {
            await axios.put(url, data);
            setIsUpdated(true);

            url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
            const passengerData = { password: user.password, email: user.email };
            const response = await axios.post(url, passengerData);
            if (response.data.length !== 0) {
                dispatch(setPassenger(response.data));
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
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
                        <h2 style={{ color: 'rgb(13, 87, 255)', textAlign: 'center' }}>עריכת פרטים</h2>
                        <p style={{ color: 'rgb(13, 87, 255)', textAlign: 'center' }}>עידכון הפרטים האישיים שלך</p>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label>שם פרטי</label>
                            <input
                                type="text"
                                defaultValue={user.firstName}
                                {...register("firstName")}
                                placeholder="הכנס שם פרטי"
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '8px' }}
                            />
                            {errors.firstName && <span>{errors.firstName.message}</span>}
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label> שם משפחה</label>
                            <input
                                type="text"
                                defaultValue={user.lastName}
                                {...register("lastName")}
                                placeholder="הכנס שם משפחה"
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '8px' }}
                            />
                            {errors.lastName && <span>{errors.lastName.message}</span>}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>מספר טלפון</label>
                            <input
                                type="tel"
                                defaultValue={user.phoneNumber}
                                {...register("phoneNumber")}
                                placeholder="הכנס מספר טלפון"
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '8px' }}
                            />
                            {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                        </div>
                        
                        <button type="submit" style={{ width: '100%', backgroundColor: 'rgb(13, 87, 255)', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
                            לשמירת השינויים <AiOutlineCheck />
                        </button>
                    </form>
                    {isUpdated && (
                        <div style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                            השינויים נשמרו בהצלחה <strong><AiOutlineCheck /></strong>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
