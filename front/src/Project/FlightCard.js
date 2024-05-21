import React from 'react';
import { Button } from 'react-bootstrap';
import { FiTrash2 } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";

const FlightCard = ({ flight, onDelete, onEdit, editable, onSave, onInputChange }) => {
    return (
        <div className="flight-card">
            <div className="flight-info">
                <p>שיוצאת מ{flight.flight.exit} ל{flight.flight.target}</p>
                <p>בתאריך {flight.flight.date}</p>
            </div>
            <div className="seat-info">
                <p>Seat {flight.seat}</p>
                {editable ? (
                    <>
                        <p>
                            אני רוצה לשבת ליד 
                            <span
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onInput={(e) => onInputChange(e, 'favoriteSomeoneFirstName')}
                            >
                                {flight.favoriteSomeoneFirstName}
                            </span>
                            <span
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onInput={(e) => onInputChange(e, 'favoriteSomeoneLastName')}
                            >
                                {flight.favoriteSomeoneLastName}
                            </span>
                        </p>
                        <p>
                            אני רוצה 
                            <span
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onInput={(e) => onInputChange(e, 'preferred')}
                            >
                                {flight.preferred}
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        {flight.favoriteSomeoneFirstName || flight.favoriteSomeoneLastName ? (
                            <p>אני רוצה לשבת ליד {flight.favoriteSomeoneFirstName} {flight.favoriteSomeoneLastName}</p>
                        ) : null}
                        {flight.preferred ? (
                            <p>אני רוצה {flight.preferred}</p>
                        ) : null}
                    </>
                )}
            </div>
            <div className="flight-time">
                {editable ? (
                    <Button variant="light" onClick={() => onSave(flight.flightCode)}>
                        Save
                    </Button>
                ) : (
                    <>
                        <Button variant="light" data-mdb-toggle="tooltip" title="מחיקת הטיסה" onClick={() => onDelete(flight)}>
                            <FiTrash2 className="trashButton" />
                        </Button>
                        <Button variant="light" data-mdb-toggle="tooltip" title="עריכה" onClick={() => onEdit(flight)}>
                            <GrEdit />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default FlightCard;
