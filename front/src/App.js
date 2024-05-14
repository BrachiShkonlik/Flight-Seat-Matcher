import '../src/Styles/App.css';
import SingPassenger from './Project/SingPassenger';
import SingIn from './Project/SingIn';
import ShowFlights from './Project/ShowFlights'
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import PrivateArea from './Project/PrivateArea';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowDetails from './Project/ShowDetails';
import AddFlight from './Project/AddFlight';
import { Profile } from './Project/Profile';
import Demo from './Project/Scheduler';
// import Edit from './Project/EditDetails';
import UserNanePassword from './Project/UserNanePassword';
import Calendar1 from './Project/Calendar1';
import EditDetails from './Project/EditDetails';
import EditFlight from './Project/EditFlight';
import Error500 from './Project/Error500';
import Error400 from './Project/Error400';
import Scheduler from './Project/Scheduler';
import About from './Project/About';
import { Edit } from './Project/Edit';
import Try from './Project/BringThemHome';

function App() {
  return (
    <div className="App">
      <header >
        <Provider store={Store}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<SingIn />}>  </Route>
              <Route exact path="/show-flights" element={<ShowFlights />}>  </Route>
              <Route exact path="/SingIn" element={<SingPassenger />}>  </Route>
              <Route exact path="/private-area" element={<PrivateArea />}>  </Route>
              <Route exact path="/show-details" element={<ShowDetails />}>  </Route>
              <Route exact path="/add-flight" element={<AddFlight />}>  </Route>
              <Route exact path="/my-profile" element={<Profile />}>  </Route>
              {/* <Route exact path="/edit" element={<Edit />}>  </Route> */}
              <Route exact path="/register" element={<UserNanePassword />}></Route>
              <Route exact path="/calendar" element={<Calendar1 />}></Route>
              <Route exact path="/edit-flight" element={<EditFlight />}></Route>
              <Route exact path="/error500" element={<Error500 />}></Route>
              <Route exact path="/error400" element={<Error400 />}></Route>
              <Route exact path="/scheduler" element={<Scheduler />}></Route>
              <Route exact path="/edit-personl-details" element={<EditDetails />}></Route>
              {/* <Route exact path="/home-page" element={<Home />}></Route> */}
              <Route exact path="/edit--" element={<Edit />}></Route>
              <Route exact path="/Try" element={<Try />}></Route>
              <Route exact path='/about-us' element={<About />}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </header>

    </div>
  );
}

export default App;


// import { Provider } from 'react-redux';
