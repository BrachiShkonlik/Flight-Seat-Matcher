import { useNavigate } from 'react-router-dom';
import { Navbar1 } from '../Project/Navbar1';

function PrivateArea() {
    const navigate = useNavigate();
    return (
        <>
        <Navbar1></Navbar1>
            <button onClick={() => { navigate("/show-details") }}>פרטים אישיים</button>
            <button onClick={() => { navigate("/show-flights") }}>טיסות קיימות</button>
            <button onClick={() => { navigate("/add-flight") }}>להוספת טיסה</button>
        </>
    );

};
export default PrivateArea;