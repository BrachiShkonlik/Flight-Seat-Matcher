import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Navbar1 } from '../Project/Navbar1';
import Button from 'react-bootstrap/Button';
import { GrEdit } from "react-icons/gr";
import '../Styles/ShowFlight.css';
import { setPassenger } from "../Redux/Actions/passengerAction";
import { deletePassenger } from '../Redux/Actions/passengerAction';
import { AiOutlineCheck } from "react-icons/ai";
import EasyEdit from 'react-easy-edit';
import { EditModal } from '../Project/EditModal';
import { Edit } from "./Edit";



function ShowFlights() {
    const passenger = (useSelector((state) => state.passengerReducer));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataToTransfer = {};
    dataToTransfer.flightRegistration = {};
    dataToTransfer.userData = {};
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [preferred, setPreferred] = useState('');
    // const saveFirstName = (value) => { setFirstName(value) }
    // const saveLastName = (value) => { setLastName(value) }
    // const savePreferred = (value) => { setPreferred(value) }
    // const cancel = () => { }
    // const nullFlight = {}

    useEffect(() => {
        document.title = 'הטיסות שלי'
    }, []);

    const deletePass = async (data) => {
        debugger
        const newData = {};
        newData.password = passenger.password;
        newData.email = passenger.email;
        newData.flightCode = data.flightCode;
        let url = `http://localhost:5170/api/PassengerWithFlight/removeFlight`;
        await axios
            .post(url, newData)
            .then(async (response) => {
                if (response.data === true) {
                url = `http://localhost:5170/api/PassengerWithFlight/getPassenger`;
                data = {};
                data.password = passenger.password;
                data.email = passenger.email;
                await axios.post(url, data)
                    .then((response) => {
                        if (response.data.length !== 0) { dispatch(setPassenger(response.data)); }
                    })
                    navigate("/show-flights");
                }
            }).catch((error) => {
                if (error.response.status === 400) navigate("/error400")
                if (error.response.status === 500) navigate("/error500")
            })
    }

    const editPass = async (data) => {
        debugger
        if (preferred !== '') {
            data.preferred = preferred;
        }
        if (firstName !== '') {
            data.favoriteSomeoneFirstName = firstName;

        }
        if (lastName !== '') {
            data.favoriteSomeoneLastName = lastName;
        }

        let url = `http://localhost:5170/api/Passengeres`;
        await axios
            .put(url,
                data
            )
            .then((response) => {
                debugger
                if (response.data === true) {

                }
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
            <div id="cart">

                {(passenger.flightsRegistration.length === 0) ?
                    <div id="noFlights">
                        <h1><br></br></h1>
                        <h1 id="noFlightsText">אופסס, אין לך טיסות במאגר</h1>
                        <h1 id="Oops button">?רוצה <span className="add" onClick={() => { navigate("/add-flight") }}>להוסיף</span> טיסה</h1>
                    </div>
                    :
                    <div>

                        {/* {passenger.flightsRegistration.map((p) => {
                            return (
                                <div className="grid-container">
                                    <Card className="grid-item" alignment='center' style={{ width: "450px", height: "500px" }}>
                                        <Card.Body id="card_body">
                                            <Card.Text>
                                                <h2>פרטי טיסה</h2>
                                                <h4>יוצאת מ{p.flight.exit}</h4>
                                                <h4>ל{p.flight.target}</h4>
                                                <h4>תאריך טיסה {p.flight.date}</h4>
                                                {(p.favoriteSomeoneFirstName) === "" && (p.favoriteSomeoneLastName) === "" ?
                                                    <h4></h4> :
                                                    <h4>אני רוצה לשבת ליד <EasyEdit
                                                        type="text"
                                                        saveButtonLabel="שמור"
                                                        cancelButtonLabel="ביטול"
                                                        value={p.favoriteSomeoneFirstName}
                                                        onSave={saveFirstName}
                                                        onCancel={cancel}
                                                    /><EasyEdit
                                                            type="text"
                                                            saveButtonLabel="שמור"
                                                            cancelButtonLabel="ביטול"
                                                            onSave={saveLastName}
                                                            onCancel={cancel}
                                                            value={p.favoriteSomeoneLastName}
                                                        />
                                                    </h4>
                                                }
                                                {(p.preferred === '') ?
                                                    <></> : <h4>אני רוצה <EasyEdit
                                                        type="datalist"
                                                        saveButtonLabel="שמור"
                                                        cancelButtonLabel="ביטול"
                                                        placeholder={p.preferred}
                                                        options={[
                                                            { label: 'לסרוג', value: 'לסרוג' },
                                                            { label: 'לצפות בסרטים', value: 'לצפות בסרטים' },
                                                            { label: 'לעבוד', value: 'לעבוד' },
                                                            { label: 'לישון', value: 'לישון' },
                                                            { label: 'לקרוא', value: 'לקרוא' },
                                                            { label: 'לדבר עם השכנים שלי', value: 'לדבר עם השכנים שלי' }]}
                                                        onSave={savePreferred}
                                                        onCancel={cancel}
                                                    /> </h4>
                                                }

                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer id="cardFooter" style={{ height: "50px" }}>
                                            <Button variant="light" data-mdb-toggle="tooltip" title="שמירת שינויים" onClick={() => { editPass(p) }}><AiOutlineCheck className="VButton"></AiOutlineCheck></Button>
                                            <Button variant="light" data-mdb-toggle="tooltip" title="מחיקת הטיסה" onClick={() => { deletePass(p) }}><FiTrash2 className="trashButton"></FiTrash2></Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            )
                        }
                        )} */}
                        {passenger.flightsRegistration.map((p) => {
                            return (
                                <div className="grid-container">
                                    <Card className="grid-item" alignment='center' style={{ width: "450px", height: "500px" }}>
                                        <Card.Body id="card_body">
                                            <Card.Text>
                                                <h2>פרטי טיסה</h2>
                                                <h4>יוצאת מ{p.flight.exit}</h4>
                                                <h4>ל{p.flight.target}</h4>
                                                <h4>תאריך טיסה {p.flight.date}</h4>
                                                {(p.favoriteSomeoneFirstName) === "" && (p.favoriteSomeoneLastName) === "" ?
                                                    <h4></h4> :
                                                    <h4>אני רוצה לשבת ליד {p.favoriteSomeoneFirstName} {p.favoriteSomeoneLastName}  </h4>
                                                }
                                                {(p.preferred === '') ?
                                                    <></> : <h4>אני רוצה {p.preferred} </h4>
                                                }

                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer id="cardFooter" style={{ height: "50px" }}>
                                            <Button variant="light" data-mdb-toggle="tooltip" title="מחיקת הטיסה" onClick={() => { deletePass(p) }}><FiTrash2 className="trashButton"></FiTrash2></Button>
                                            {/* <Button variant="light" data-mdb-toggle="tooltip" title="עריכה" ><EditModal p = {p}></EditModal></Button> */}
                                            <Button variant="light" data-mdb-toggle="tooltip" title="עריכה" onClick={() => {
                                                debugger;
                                                dataToTransfer.flightRegistration = p;
                                                dataToTransfer.userData = passenger;
                                                navigate('/edit--', { state: dataToTransfer });
                                            }}>
                                                <GrEdit></GrEdit></Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            )
                        }
                        )}

                        <div class="container">

                            <a className="plusBtn" onClick={() => { navigate("/add-flight") }}>
                                <div className="plusBtn__line"></div>
                                <div className="plusBtn__line"></div>
                                <span className="plusBtn__text" ><FaPlus></FaPlus></span>
                                <div className="plusBtn__drow1"></div>
                                <div className="plusBtn__drow2"></div>
                            </a>

                        </div>

                    </div>
                }
            </div>
        </>
    );
}
export default ShowFlights;

