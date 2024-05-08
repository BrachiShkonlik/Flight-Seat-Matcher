import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FiEdit3, FiSave } from "react-icons/fi";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
// import { setPassenger } from '../Redux/Actions/passengerAction';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';

export function EditModal(props) {

    const [thePreferred, setThePreferred] = useState('');
    const [show, setShow] = useState(false);
    const handeClose = () => setShow(false);
    const handeShow = () => setShow(true);
    const navigate = useNavigate();
    // const userArr = useSelector((state) => state.userReducer);

    const schema = yup.object().shape({
        flightCode: yup.string().required(),

    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });



    const onSubmit = (data) => { editPass(data); }

    const editPass = async (data) => {

        let url = `http://localhost:5170/api/PassengerWithFlight/updateFlight`;
        data.flightRegistration.flightCode = props.p.flightCode;
        data.user = {};
        data.user.password = "";
        data.user.email = "";
        data.user.flightCode = props.p.flightCode;
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
            <Button variant="light" onClick={() => {
                handeShow();
            }}><FiEdit3></FiEdit3></Button>


            <Modal show={show} onHide={handeClose} size="xl">
                <Modal.Header X closeButton >
                    <Modal.Title>עריכת פרטי טיסה</Modal.Title>
                </Modal.Header >
                <Modal.Body id="ModalBody">
                    <Form>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4>יוצאת מ{props.p.flight.exit}</h4>
                            <h4>ל{props.p.flight.target}</h4>
                            <h4>תאריך טיסה {props.p.flight.date}</h4>
                            {(props.p.favoriteSomeoneFirstName) === "" && (props.p.favoriteSomeoneLastName) === "" ?
                                <h4>
                                    <input type="text" placeholder="אתה רוצה לשבת ליד משהו מסויים?" {...register("flightRegistration.favoriteSomeoneFirstName")} />
                                    <input type="text" placeholder="אתה רוצה לשבת ליד משהו מסויים?" {...register("flightRegistration.favoriteSomeoneLastName")} />
                                </h4> :
                                <h4>{<input type="text" className="input" defaultValue={props.p.favoriteSomeoneLastName} {...register("flightRegistration.favoriteSomeoneFirstName")} />}
                                    {<input type="text" className="input" defaultValue={props.p.favoriteSomeoneFirstName} {...register("flightRegistration.favoriteSomeoneLastName")} />}אני רוצה לשבת ליד</h4>
                            }
                            <h4>אני רוצה {<select onChange={(e) => { setThePreferred(e.target.value) }}>
                                <option >{props.p.preferred}</option>
                                <option value="לסרוג">לסרוג</option>
                                <option value="לצפות בסרטים">לצפות בסרטים</option>
                                <option value="לעבוד">לעבוד</option>
                                <option value="לדבר עם השכנים שלי ">לדבר עם השכנים שלי לטיסה</option>
                                <option value="לישון">לישון</option>
                                <option value="לקרוא">לקרוא</option>
                            </select>} בטיסה</h4>
                            <input type="submit" />

                        </form>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
};



