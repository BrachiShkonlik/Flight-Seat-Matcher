import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from '../Redux/Actions/userAction';
import { setPassenger } from '../Redux/Actions/passengerAction';
import React, {useEffect} from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';
import '../Styles/App.css';

function Signin() {

  useEffect(() => {
    document.title = 'רישום'
}, []);

  const navigate = useNavigate();
  const dispach = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required("Your password is requird").min(5).max(20),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => { SigninPassenger(data); }

  // const SigninPassenger = async (data) => {
  //   debugger
  //   let url = `http://localhost:5170/api/PersonalDetails/getPersonalDetails`;
  //   await axios
  //     .post(url, data)
  //     .then(async (response) => {
  //       if (response.data.length !== 0) {
  //         dispach(setUser(response.data));
  //         url = `http://localhost:5170/api/Passengeres/-`;
  //         await axios
  //           .post(url, data)
  //           .then((response) => {
  //             debugger
  //             if (response.data.length !== 0) {
  //               dispach(setPassenger(response.data));
  //             } navigate("/show-flights");
  //           }).catch((error) => {
  //             if (error.response.status === 400) navigate("/error400")
  //             if (error.response.status === 500) navigate("/error500")
  //           })
  //       } else { alert("אופסססס, יש לך טעות בשם משתמש או בסיסמא. \n נסה שנית או הירשם") }
  //     }
  //     ).catch((error) => {
  //       if (error.response.status === 400) navigate("/error400")
  //       if (error.response.status === 500) navigate("/error500")
  //     })
  // }



  const SigninPassenger = async (data) => {
    debugger
    let url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
    await axios
      .post(url, data)
      .then(async (response) => {
        if (response.data.length !== 0) {
          dispach(setPassenger(response.data));
          navigate("/show-flights");
        } else { alert("אופסססס, יש לך טעות בשם משתמש או בסיסמא. \n נסה שנית או הירשם") }
      } 
      ).catch((error) => {
        if (error.response.status === 400) navigate("/error400")
        if (error.response.status === 500) navigate("/error500")
      })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <MDBContainer className="p-3 my-5 d-flex flex-column w-50" >

        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='text' {...register("email")} />
        <p>{errors.UserName?.message}</p>
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' {...register("password")} />
        <p>{errors.Password?.message}</p>

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />

          <a href="!#">   Forgot password?</a>
        </div>
        <MDBBtn className='mb-4' type='submit' block>
          Sign in
        </MDBBtn>
        {/* <MDBBtn className="mb-4">Sign in</MDBBtn> */}

        <div className="text-center">
          <p>Not a member? <a href="" onClick={() => { navigate("/register") }}> Register</a></p>
        </div>

      </MDBContainer>
    </form>
  );
}

export default Signin;