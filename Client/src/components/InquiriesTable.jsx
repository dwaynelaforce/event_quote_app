import { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, Button} from 'react-bootstrap';

function InquiriesTable(props){
    const {isLoggedIn} = props;
    const [ inquiriesList, setInquiriesList] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/all')
            .then(res => {
                let myInquiriesList = res.data;
                for (let i = 0; i < myInquiriesList.length; i++) {
                    let inquiry = myInquiriesList[i];
                    let temp_createdAt = new Date(inquiry.createdAt);
                    temp_createdAt = temp_createdAt.toLocaleDateString()
                    inquiry.createdAt = temp_createdAt;
                    if (inquiry.eventStart){
                        let temp_start = new Date(inquiry.eventStart);
                        temp_start = temp_start.toLocaleDateString();
                        inquiry.eventStart = temp_start;
                    } else {
                        inquiry.eventStart = "";
                    }
                    myInquiriesList[i] = inquiry;
                }
                setInquiriesList(myInquiriesList);
            })
            .catch(err => console.log(err));
    }, []);

    function deleteHandler(id) {
        axios.delete('http://localhost:8000/api/delete/' + id)
        .then(setInquiriesList(inquiriesList.filter(inquiry => inquiry._id !== id)))
        .catch(err => console.log(err));
    };

    if (props.isLoggedIn === true) {
        if (inquiriesList.length === 0) {
            return (
                <h1>No data to display</h1>
            );
        };
        return (
            <Table hover variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Contact</th>
                        <th>Organization</th>
                        <th>Email</th>
                        <th>Event Date</th>
                        <th>Events</th>
                        <th>Quote</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiriesList.map((inquiry, index) =>
                        <tr key={index}>
                            <td>{inquiry.createdAt}</td>
                            <td>{inquiry.contactName}</td>
                            <td>{inquiry.orgName}</td>
                            <td>{inquiry.contactEmail}</td>
                            <td>{inquiry.eventStart}</td>
                            <td>{inquiry.numberOfEvents}</td>
                            { inquiry.masterQuote ? 
                                <td>${inquiry.masterQuote.total}.00</td>
                                : <td/> }
                            <td><a href={"/inquiry/" + inquiry._id}>View</a></td>
                            <td>
                                <button onClick={()=>deleteHandler(inquiry._id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    } else {
        return (
            <div></div>
        );
    }
}
export default InquiriesTable;