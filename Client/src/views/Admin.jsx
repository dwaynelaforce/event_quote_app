import { useState } from 'react';
import { Form } from 'react-bootstrap';
import InquiriesTable from '../components/InquiriesTable.jsx';

function Admin(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // default password
    const adminPassword = "admin"

    function passwordHandler(e) {
        e.preventDefault();
        let userInput = e.target.value;
        if (userInput === adminPassword){
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }
    return (
        <div>
            <div className="mb-3">
                <h1>Admin Login</h1>
                <Form.Row>
                    <div className="col">
                        <Form.Control placeholder="password:" inline type="password" onChange={(e) => passwordHandler(e)}/>
                    </div>
                    <div className="col"></div>
                </Form.Row>
            </div>
            <InquiriesTable isLoggedIn={isLoggedIn}/>
        </div>
    );
}
export default Admin;