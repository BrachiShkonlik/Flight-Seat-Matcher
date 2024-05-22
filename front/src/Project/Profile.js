import { useSelector } from "react-redux";
import Graph from './Graph';
import { Navbar1 } from '../Project/Navbar1';
import BringThemHome from '../Project/BringThemHome';
import React, { useEffect } from "react";
import '../Styles/Profile.css'

export function Profile() {

    const userArr = useSelector((state) => state.userReducer);
    debugger
    const passenger = useSelector((state) => state.passengerReducer);
    // const  = passengerArr[0];

    useEffect(() => {
        document.title = 'הפרופיל שלי';
    }, []);

    return (
        <>
            <Navbar1></Navbar1>
            <BringThemHome></BringThemHome>
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row container d-flex justify-content-center">
                        <div class="col-xl-6 col-md-12">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25">
                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"></img>
                                            </div>
                                            <h5 class="f-w-600">{passenger.firstName} {passenger.lastName}</h5>
                                            {/* <p>Web Designer</p> */}
                                            <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">פרטים אישיים</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">מספר טלפון</p>
                                                    <h6 class="text-muted f-w-400">{passenger.phoneNumber}</h6>

                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">כתובת דוא"ל</p>
                                                    <h6 class="text-muted f-w-400">{passenger.email}</h6>
                                                </div>
                                            </div>
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">נתוני טיסות</h6>
                                            <div class="row" className="mergeRow">
                                                {/* <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"><Graph></Graph></p>
                                                    <h6 class="text-muted f-w-400"></h6>
                                                </div> */}
                                                <div class="col-sm-6" className="mergeRow">
                                                    <p class="m-b-10 f-w-600">מספר הטיסות שלך</p>
                                                    <h6 class="text-muted f-w-400">{(passenger.flightsRegistration).length}</h6>
                                                </div>
                                            </div>
                                            <div class="row" className="mergeRow">
                                                <div class="col-sm-6" className="mergeRow">
                                                    <p class="m-b-10 f-w-600"> החלומות שלך לטיסה</p>
                                                    <p class="m-b-10 f-w-600"><Graph></Graph></p>
                                                    <h6 class="text-muted f-w-400"></h6>
                                                </div>
                                            </div>
                                            <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}