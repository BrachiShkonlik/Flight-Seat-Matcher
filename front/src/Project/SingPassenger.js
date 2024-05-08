import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../Redux/Actions/userAction';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../Styles/App.css';
import { setPassenger } from '../Redux/Actions/passengerAction';


export default function SingPassenger() {

    const { state } = useLocation();
    const { props } = state;
    const dispach = useDispatch();
    const navigate = useNavigate();
    const [theBirthday, setTheBirthday] = useState('');
    const [theGander, setTheGander] = useState(0);
    const schema = yup.object().shape({

        email: yup.string().required(),
        password: yup.string().required("Your password is requird"),
        firstName: yup.string().required("Your name is requird"),
        lastName: yup.string().required("Your name is requird"),
        phoneNumber: yup.string().required("Your phone number is requird"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => { createUser(data); }

    

    const createUser = async (data) => {
        data.birthday = theBirthday;
        data.gander = theGander;
        debugger;
        let url = `http://localhost:5170/api/PassengerWithFlight`;
        await axios
            .post(url,
                data
            )
            .then(async (response) => {
                if (response.data === true) {
                    dispach(setPassenger(data));
                    navigate("/home-page");
                }
            })
            .catch((error) => {
                debugger
                if (error.response.status === 400) navigate("/error400")
                if (error.response.status === 500) navigate("/error500")
            });



    }
    return (
        <>
            <div className="register">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBInput id='form6Example2' label='שם משפחה' translate="last name"{...register("lastName")} />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput id='form6Example1' label='שם פרטי' translate="first name" {...register("firstName")} />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBInput id='form6Example1' type='password' label='סיסמא' translate="password" value={state.password} {...register("password")} />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput id='form6Example2' type='email' label='כתובת מייל' translate="email" value={state.email} {...register("email")} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='מספר טלפון' translate="phone number" {...register("phoneNumber")} />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput wrapperClass='mb-4' type="date" id='form6Example6' label='תאריך לידה' translate="birthday" onChange={(e) => { setTheBirthday(e.target.value) }} />
                        </MDBCol>
                        <Form.Select label="מין" defaultValue="מין" onChange={(e) => { setTheGander(e.target.value) }}>
                            <option>מין</option>
                            <option value="1">זכר</option>
                            <option value="2">נקבה</option>
                            <option value="0">לא רוצה לציין</option>
                        </Form.Select>
                    </MDBRow>
                    <MDBBtn className='mb-4' type='submit' block>
                        Sing up
                    </MDBBtn>
                </form>
            </div >
        </>
    );
};


