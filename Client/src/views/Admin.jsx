import { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import {Form, Row, Col} from 'react-bootstrap';
import InquiriesTable from '../components/InquiriesTable.jsx';

function Admin(props) {
    const [inquiriesList, setInquiriesList] = useState([]);
    const [inputPassword, setInputPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const adminPassword = "admin"


    
    
    function passwordHandler(e) {
        e.preventDefault();
        let userInput = e.target.value;
        setInputPassword(userInput);
        if (userInput === adminPassword){
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }
    return (
        <div>
            <div>
                <h1>Admin Login</h1>
                <Form.Row>
                    <div className="col">
                        <Form.Control placeholder="password:" inline type="password" onChange={(e) => passwordHandler(e)}/>
                    </div>
                    <div className="col"></div>
                </Form.Row>
            </div>
            <InquiriesTable isLoggedIn={isLoggedIn} />
        </div>
    );
}
export default Admin;