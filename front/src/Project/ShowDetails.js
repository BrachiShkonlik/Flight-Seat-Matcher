import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Navbar1 } from '../Project/Navbar1';


function ShowDetails() {
    const [show, setShow] = useState(false);
    const userArr = useSelector((state) => state.userReducer);
    const dispach = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     document.title = 'What I want to eat'
    // }, []);

    return (
        <>
        <Navbar1></Navbar1>
            <div id="cart">
                {userArr.length === 0 ?
                    <div>
                      <h1>אופסססס, משהו השתבש</h1>  
                    </div>
                    :
                    <div>
                        <h4></h4>{userArr.firstName}
                        <h4></h4>{userArr.lastName}
                        <h4></h4>{userArr.phoneNumber}
                        <h4></h4>{userArr.age}
                    </div>
                }
            </div>
        </>
    );
}
export default ShowDetails;