import { useState, useEffect } from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';

function InquiriesTable(props){
    const {setInquiriesList, inquiriesList, isLoggedIn} = props;
    useEffect(() => {
        axios.get('http://localhost:8000/api/all')
            .then(res => {
                let list = res.data;
                for (let i = 0; i < list.length; i++) {
                    let inquiry = list[i];
                    if (inquiry.createdAt) {
                        let temp_inq_date = new Date(inquiry.createdAt);
                        temp_inq_date = temp_inq_date.toLocaleDateString();
                        inquiry.createdAt = temp_inq_date;
                    } else {
                        inquiry.createdAt = "";
                    }
                    if (inquiry.eventStart) {
                        let temp_start_date = new Date(inquiry.eventStart);
                        temp_start_date = temp_start_date.toLocaleDateString();
                        inquiry.eventStart = temp_start_date;
                    } else {
                        inquiry.eventStart = "";
                    }
                    list[i] = inquiry;
                }
                setInquiriesList(list);
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
            <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Contact</th>
                        <th>Organization</th>
                        <th>Email</th>
                        <th>Event Date</th>
                        <th>Events</th>
                        <th>Actions</th>
                        <th>Quote</th>
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
                            <td> <button onClick={()=>deleteHandler(inquiry._id)}>Delete</button></td>
                            { inquiry.masterQuote ? 
                                <td>${inquiry.masterQuote.total}.00</td>
                            : null }
                            <td><a href={"/api/inquiry/" + inquiry._id}>View</a></td>
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