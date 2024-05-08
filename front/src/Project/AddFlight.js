import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { setPassenger } from '../Redux/Actions/passengerAction';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Navbar1 } from '../Project/Navbar1';
import BringThemHome from '../Project/BringThemHome';
import Select from 'react-select';

function AddFlight() {

    const [thePreferred, setThePreferred] = useState('');
    const [theFlight, setTheFlight] = useState('');
    const [data, setData] = useState([]);
    let flights = [];
    let options = [];
    const dispach = useDispatch();
    const navigate = useNavigate();
    const [isSearchable, setIsSearchable] = useState(true);

    useEffect(() => {
        document.title = 'הוספת טיסה'
    }, []);

    const getAllFlghts = async () => {
        let url = `http://localhost:5170/api/Flights`;
        await axios.get(url)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                if (error.response.status === 400) navigate("/error400")
                if (error.response.status === 500) navigate("/error500")
            })
    };

    useEffect(() => {
        getAllFlghts();
    }, []);


    // const userArr = useSelector((state) => state.userReducer);
    const passenger = (useSelector((state) => state.passengerReducer));
    // const  = passengerArr[0];
    const [value, setValue] = React.useState({});
    const schema = yup.object().shape({

    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    // const onSubmit = (data) => { AddFlight(data); }
    // const AddFlight = async (data) => {
    //     debugger
    //     const newData = {};
    //     newData.password = userArr.password;
    //     newData.email = userArr.email;
    //     newData.flightCode = theFlight;
    //     //checking if this flight is קxists
    //     let url = `http://localhost:5170/api/Passengeres/checking`;
    //     await axios
    //         .post(url,
    //             newData
    //         ).then(async (response) => {
    //             debugger
    //             if (response.data === true) {
    //                 data.password = userArr.password;
    //                 data.email = userArr.email;
    //                 data.preferred = thePreferred;
    //                 data.flightCode = theFlight;
    //                
    //                 //add the flight
    //                 url = `http://localhost:5170/api/Passengeres`;
    //                
    //                 await axios
    //                     .post(url,
    //                         data
    //                     )
    //                     .then(async (response) => {
    //                      
    //                         alert("הטיסה נוספה בהצלחה");
    //                         url = `http://localhost:5170/api/Passengeres/getPassenger`;
    //                         await axios.post(url,
    //                             newData
    //                         )
    //                             .then((response) => {
    //                                 const arr = [];
    //                                 debugger
    //                                 arr.push(response.data)
    //                                 dispach(setPassenger(arr));
    //                                 navigate("/show-flights");
    //                             })
    //                     });
    //             }
    //             else {
    //                 alert("אופסס...\n הטיסה הזו כבר רשומה במערכת")
    //                 navigate("/show-flights");
    //             }

    //         })
    //         .catch((error) => {
    //             if (error.response.status === 400) navigate("/error400")
    //             if (error.response.status === 500) navigate("/error500")
    //         })


    const onSubmit = (data) => { AddFlight(data); }
    const AddFlight = async (data) => {
        debugger
        const newData = {};
        newData.password = passenger.password;
        newData.email = passenger.email;
        newData.flightCode = theFlight;
        //checking if this flight is exists
        let url = `http://localhost:5170/api/PassengerWithFlight/checking`;
        await axios
            .post(url,
                newData
            ).then(async (response) => {
                debugger
                if (response.data === true) {
                    // data.password = passenger.password;
                    // data.email = passenger.email;
                    // data.preferred = thePreferred;
                    // data.flightCode = theFlight;
                    data.flightRegistration.flightCode = theFlight;
                    data.flightRegistration.preferred = thePreferred;
                    // data.flightRegistration.favoriteSomeoneFirstName = 


                    data.user = {};
                    data.user.password = passenger.password;
                    data.user.email = passenger.email;
                    //add the flight
                    url = `http://localhost:5170/api/PassengerWithFlight/addFlight`;
                    await axios
                        .post(url,
                            data
                        )
                        .then(async (response) => {
                            alert("הטיסה נוספה בהצלחה");
                            url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
                            await axios.post(url,
                                newData
                            )
                                .then((response) => {
                                    // const arr = [];
                                    // debugger
                                    // arr.push(response.data)
                                    // dispach(setPassenger(arr));
                                    dispach(setPassenger(response.data))
                                    navigate("/show-flights");
                                })
                        });
                }
                else { alert("אופסס...\n הטיסה הזו כבר רשומה במערכת") }

            })
            .catch((error) => {
                if (error.response.status === 400) navigate("/error400")
                if (error.response.status === 500) navigate("/error500")
            })


    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Navbar1></Navbar1>
                <BringThemHome></BringThemHome>
                <h1 className="white" >**</h1>
                <h1 className="white">**</h1>
                <select
                    onChange={(e) => { setTheFlight(e.target.value) }}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={"טיסה"}
                    isSearchable={isSearchable}>
                    options={data.map(item => <option key={item.exit} value={item.flightCode}>{`מ${item.exit} ל${item.target} ,${item.company}`}</option>)}
                </select>

                <p>{errors.favoriteSomeoneFirstName?.message}</p>
                <input type="text" placeholder="אתה רוצה לשבת ליד משהו מסויים?" {...register("flightRegistration.favoriteSomeoneFirstName")} />
                <p>{errors.favoriteSomeoneFirstName?.message}</p>
                <input type="text" placeholder="אתה רוצה לשבת ליד משהו מסויים?" {...register("flightRegistration.favoriteSomeoneLastName")} />
                <p>{errors.favoriteSomeoneLastName?.message}</p>

                <select placeholder="מה החלומות שלך לטיסה?" onChange={(e) => { setThePreferred(e.target.value) }}>
                    <option >?מה החלומות שלך לטיסה</option>
                    <option value="לסרוג">לסרוג</option>
                    <option value="לצפות בסרטים">לצפות בסרטים</option>
                    <option value="לעבוד">לעבוד</option>
                    <option value="לדבר עם השכנים שלי">לדבר עם השכנים שלי לטיסה</option>
                    <option value="לישון">לישון</option>
                    <option value="לקרוא">לקרוא</option>
                </select>
                <br></br>
                <input type="submit" />

            </form>
        </>
    );
};

export default AddFlight;

