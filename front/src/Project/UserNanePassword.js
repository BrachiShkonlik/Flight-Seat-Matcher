import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../Styles/App.css';
import { useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

function UserNanePassword() {

  useEffect(() => {
    document.title = 'הצטרפות אלינו'
}, []);

  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const schema = yup.object().shape({

    email: yup.string().required(),
    password: yup.string().required('Password is required').min(8, 'סיסמה חייבת להכיל 8 תוים')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),

  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {  }
  let data = {};


  return (
    <form onSubmit={() => navigate('/SingIn', { replace: false, state: {email, password} })}>

      <MDBContainer className="p-3 my-5 d-flex flex-column w-50" >

        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='text' onChange={(e) => { setEmail(e.target.value) }} />

        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => { setPassword(e.target.value) }}  />
        <p>{errors.Password?.message}</p>
        {/* <MDBBtn className="mb-4" >Sign in</MDBBtn> */}

        {password !== '' ?
          <><br></br>אימות סיסמה<br></br>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => { setNewPassword(e.target.value) }} />
            <p>{errors.Password?.message}</p>
            <p></p>
            {password !== newPassword ?
              <h4>סיסמא לא זהה</h4>
              :
              <MDBBtn className="mb-4">
                Sign in</MDBBtn>}
          </>
          :
          <></>
        }
      </MDBContainer>
    </form>
  );
}

export default UserNanePassword;

