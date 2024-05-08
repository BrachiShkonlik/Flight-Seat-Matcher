import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useState,  useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { Navbar1 } from "./Navbar1";
import { setPassenger } from '../Redux/Actions/passengerAction';
import { useDispatch, useSelector } from "react-redux";

export function Edit() {
    useEffect(() => {
        document.title = 'שינוי חלומות לטיסה'
    }, []);

    const dispatch = useDispatch();
    const { state } = useLocation();
    const [thePreferred, setThePreferred] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();
    const schema = yup.object().shape({})
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => { editPass(data); }

    const editPass = async (data) => {
        let url = `http://localhost:5170/api/PassengerWithFlight/updateFlight`;
        data.flightRegistration.flightCode = state.flightRegistration.flightCode;
        data.flightRegistration.preferred = thePreferred;
        data.user = {};
        data.user.password = state.userData.password;
        data.user.email = state.userData.email;
        data.user.flightCode = state.flightRegistration.flightCode;
        await axios.post(url, data)
            .then(async (response) => {
                setIsUpdated(response.data);
                url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
                data = {};
                data.password = state.userData.password;
                data.email = state.userData.email;
                setTimeout( async function() {
                    await axios.post(url, data)
                    .then((response) => {
                        if (response.data.length !== 0) {
                            dispatch(setPassenger(response.data));
                        } navigate("/show-flights");
                    })
                }, 700);
               
            }).catch((error) => {
                if (error.response.status === 400) navigate("/error400")
                if (error.response.status === 500) navigate("/error500")
            });
    }

    return (
        <>
            <Navbar1></Navbar1>
            <h1 className="white" >**</h1>
            <h1 className="white">**</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>יוצאת מ{state.flightRegistration.flight.exit}</h4>
                <h4>ל{state.flightRegistration.flight.target}</h4>
                <h4>תאריך טיסה {state.flightRegistration.flight.date}</h4>
                {(state.flightRegistration.favoriteSomeoneFirstName) === "" && (state.flightRegistration.favoriteSomeoneLastName) === "" ?
                    <h4>
                        <input type="text" placeholder="אתה רוצה לשבת ליד משהו מסויים?" {...register("flightRegistration.favoriteSomeoneFirstName")} />
                        <input type="text" placeholder="אתה רוצה לשבת ליד משהו מסויים?" {...register("flightRegistration.favoriteSomeoneLastName")} />
                    </h4> :
                    <h4>{<input type="text" className="input" defaultValue={state.flightRegistration.favoriteSomeoneLastName} {...register("flightRegistration.favoriteSomeoneFirstName")} />}
                        {<input type="text" className="input" defaultValue={state.flightRegistration.favoriteSomeoneFirstName} {...register("flightRegistration.favoriteSomeoneLastName")} />}אני רוצה לשבת ליד</h4>
                }
                <h4>אני רוצה {<select onChange={(e) => { setThePreferred(e.target.value) }}>
                    <option >{state.flightRegistration.preferred}</option>
                    <option value="לסרוג">לסרוג</option>
                    <option value="לצפות בסרטים">לצפות בסרטים</option>
                    <option value="לעבוד">לעבוד</option>
                    <option value="לדבר עם השכנים שלי ">לדבר עם השכנים שלי לטיסה</option>
                    <option value="לישון">לישון</option>
                    <option value="לקרוא">לקרוא</option>
                </select>} בטיסה</h4>
                <input type="submit" />
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
        </>
    );
};



