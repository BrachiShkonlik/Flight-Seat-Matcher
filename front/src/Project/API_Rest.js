import axios from "axios";
import { setUser } from '../Redux/Actions/userAction';
import { setPassenger } from '../Redux/Actions/passengerAction';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export const getAll = async (url) => {
        //let url = `http://localhost:5170/api/Passengeres`;
       await axios.get(url)
       .then((response) => {();})
    };

export const create = async(data, url) => {
    // let url = `http://localhost:5170/api/Passengeres`;
    await axios
      .post(url,
       data
      )
      .then((response) => {
      });
    };  
  
export function SigninPassenger (data){
    // const navigate = useNavigate();
    // const dispach = useDispatch();
    let url = `http://localhost:5170/api/Passengeres/-`;
     axios
      .post(url,
        data
      )
      .then((response) => {
        if(response.data.length !== 0){
        //   dispach(setPassenger(response.data));
        //   dispach(setUser(response.data[0].details));
        //  navigate("/private-area");
        } else {alert("אופסססס, יש לך טעות בשם משתמש או בסיסמא. \n נסה שנית או הירשם")}
        
        
      });  
      
   };

