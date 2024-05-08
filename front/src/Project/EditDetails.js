import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import { AiOutlineCheck } from "react-icons/ai";
import { Navbar1 } from "./Navbar1";
import '../Styles/App.css';
import { setPassenger } from "../Redux/Actions/passengerAction";

export default function EditDetails() {

    useEffect(() => {
        document.title = 'עריכת פרטים'
    }, []);

    const user = useSelector((state) => state.passengerReducer);
    const dispatch = useDispatch();
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        firstName: yup.string().required("Your name is requird"),
        lastName: yup.string().required("Your name is requird"),
        phoneNumber: yup.string().required("Your phone number is requird"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => { apdateUser(data); }

    const apdateUser = async (data) => {
        debugger;
        data.password = user.password;
        data.email = user.email;
        data.birthday = user.birthday;
        data.flightsRegistration = (user.flightsRegistration);
        data.gander = user.gander;
        let url = `http://localhost:5170/api/PassengerWithFlight`;
        await axios
            .put(url,
                data
            )
            .then(async (response) => {
                setIsUpdated(response.data);
                url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
                data = {};
                data.password = user.password;
                data.email = user.email;
                await axios.post(url, data)
                    .then((response) => {
                        if (response.data.length !== 0) { dispatch(setPassenger(response.data)); }
                    })
            })
            .catch((error) => {
                if (error.response.status === 400) navigate("/error400")
                if (error.response.status === 500) navigate("/error500")
            })
    }
    return (
        <>
            <Navbar1></Navbar1>
            <h1 className="white" >**</h1>
            <h1 className="white">**</h1>
            <div className="register">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBInput id='form6Example2' label='שם משפחה' defaultValue={user.lastName} {...register("lastName")} />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput id='form6Example1' label='שם פרטי' defaultValue={user.firstName} {...register("firstName")} />
                        </MDBCol>
                    </MDBRow>

                    {/* <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBInput id='form6Example1' type='password' label='סיסמא' value={user.password} {...register("password")} />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput id='form6Example2' type='email' label='כתובת מייל' value={user.email} {...register("email")} />
                        </MDBCol>
                    </MDBRow> */}

                    <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='מספר טלפון' defaultValue={user.phoneNumber} {...register("phoneNumber")} />


                    <MDBBtn className='mb-4' type='submit' block>
                        לשמירת השינויים<>  </><AiOutlineCheck> </AiOutlineCheck>
                    </MDBBtn>
                </form>
                {(isUpdated === false) ?
                    <> </>
                    :
                    <>
                        <div className="isUpdated">
                            <div class="alert alert-success">
                                השינויים נשמרו בהצלחה <strong><AiOutlineCheck></AiOutlineCheck></strong>
                            </div>
                        </div>
                    </>
                }
            </div>


        </>
    );
};


