import React from 'react';
import { Button } from 'react-bootstrap';
import { FiTrash2 } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { IoAirplane } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaTableCellsLarge } from "react-icons/fa6";

const FlightCard = ({ flight, onDelete, onEdit, editable, onSave, onInputChange }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'short',
            hour12: false,
        }).format(date);
    };

    return (
        <div className="flight-card">
            <div className="button-section">
                {editable ? (
                    <Button variant="light" onClick={() => onSave(flight.flightCode)}>
                        שמירת שינויים
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
            <div className="flight-content">
                <div className="flight-section">
                    <div className="flight-info">
                        <p>{flight.flightCode} טיסה מספר</p>
                        <p>שיוצאת מ{flight.flight.exit} ל{flight.flight.target}</p>
                        <p>בתאריך {formatDate(flight.flight.date)}</p>
                    </div>
                    <IoAirplane className="icon-right" />
                </div>
                <div className="flight-section">
                    <div className="seat-info">
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
                    <FaRegStar className="icon-right" />
                </div>
                <div className="flight-section">
                    <div className="flight-time">
                        {flight.seat != null &&
                            <p>Seat {flight.seat}</p>
                        } <p>המיקום המדויק שלך עדיין לא מוגדר</p>
                        <p> אנחנו עושים כל מה שאפשר שהוא יהיה מושלם</p>
                    </div>
                    <FaTableCellsLarge className="icon-right" />
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
