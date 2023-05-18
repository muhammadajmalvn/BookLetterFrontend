import React, { useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { adminGetAllSellAction } from '../../../Redux/Actions/adminActions/adminSellActions';
import { adminChangeStatusAPI } from '../../../APIs/adminAPI';

const SingleSellRequest = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { adminSellBooks } = location.state
    const clickedOrder = adminSellBooks.find((order) => order._id === location.state.sellId)

    const [status, setStatus] = useState('');

    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
    }
    const handleSubmitStatus = async (orderId) => {
        try {
            adminChangeStatusAPI(orderId, status).then((response) => {
                dispatch(adminGetAllSellAction())
                console.log(response.data);
                navigate('/admin/sell-request');
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar />
            <section
                className="h-100 gradient-custom"
                style={{ backgroundColor: "#eee" }}
            >
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="10" xl="8">
                            <MDBCard style={{ borderRadius: "10px" }}>

                                <MDBCardBody className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p
                                            className="lead fw-normal mb-0"
                                            style={{ color: "#a8729a" }}
                                        >
                                            Sell Request Details
                                        </p>
                                        <p className="small text-muted mb-0">
                                            Order Number : {clickedOrder._id}
                                        </p>
                                    </div>

                                    <MDBCard className="shadow-0 border mb-4">
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol md="2">
                                                    <MDBCardImage
                                                        src={clickedOrder.photo[0]}
                                                        fluid
                                                        alt="Phone"
                                                    />
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0">Title:{clickedOrder.title}</p>
                                                </MDBCol>

                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">Publications:{" "}
                                                        {clickedOrder.publisher}
                                                    </p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">Pages:{clickedOrder.pages}</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">Purchased Date:{new Date(clickedOrder.publishedDate).toLocaleDateString()}</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">Asking Price: Rs {clickedOrder.askingPrice}</p>
                                                </MDBCol>

                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center mx-auto"
                                                >
                                                    <p className="text-muted mb-0 small">Status: {clickedOrder.status}</p>
                                                </MDBCol>
                                                {clickedOrder.trackingId ?
                                                    <MDBCol
                                                        md="2"
                                                        className="text-center d-flex justify-content-center align-items-center mx-auto"
                                                    >
                                                        <p className="text-muted mb-0 small">Tracking Id: {clickedOrder.trackingId}</p>
                                                    </MDBCol>
                                                    : ""}
                                            </MDBRow>
                                            <hr
                                                className="mb-4"
                                                style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                                            />
                                            <MDBRow>
                                                {clickedOrder.statusHistory ? clickedOrder.statusHistory.map((status) => {
                                                    return (
                                                        <MDBCol>
                                                            <li className="list-inline-item items-list ">
                                                                <div className="py-1 px-2 rounded text-white d-flex justify-content-between" style={{ backgroundColor: status.status === 'pending' ? '#f37a27' : status.status === 'shipped' ? 'blue' : status.status === 'approved' ? '#4caf50' : status.status === 'accepted' ? '#4caf50' : '#f37a27' }}>
                                                                    {status.status}
                                                                </div>
                                                                <div className="py-1 px-2 rounded text-white d-flex justify-content-around" style={{ backgroundColor: status.status === 'pending' ? '#f37a27' : status.status === 'shipped' ? 'blue' : status.status === 'approved' ? '#4caf50' : status.status === 'accepted' ? '#4caf50' : '#f37a27' }}>
                                                                    {new Date(status.date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                                                                </div>
                                                            </li>
                                                        </MDBCol>
                                                    )
                                                }) : ''}
                                            </MDBRow>
                                        </MDBCardBody>
                                        <MDBRow className='mx-auto'>
                                            <div className='d-flex mx-auto my-auto'>
                                                {clickedOrder.status === "pending" && (
                                                    <select onChange={(e) => handleChangeStatus(e.target.value)} style={{ backgroundColor: "white", border: "1px solid black" }}>
                                                        <option value="{clickedOrder.status}">{clickedOrder.status}</option>
                                                        <option value="accepted">Accept</option>
                                                        <option value="rejected">Reject</option>
                                                    </select>
                                                )}
                                                {clickedOrder.status === "shipped" && (
                                                    <select onChange={(e) => handleChangeStatus(e.target.value)}>
                                                        <option value="{clickedOrder.status}">{clickedOrder.status}</option>
                                                        <option value="received">Received</option>
                                                    </select>
                                                )}
                                                {clickedOrder.status !== "received" && clickedOrder.status !== "accepted" && clickedOrder.status !== "rejected" ?
                                                    <button onClick={() => handleSubmitStatus(clickedOrder._id)} className='btn btn-sm btn-primary ms-2'>
                                                        Save
                                                    </button>
                                                    :
                                                    <button style={{ visibility: "hidden" }} className='btn btn-sm btn-primary ms-2'>
                                                        Save
                                                    </button>
                                                }

                                            </div>
                                        </MDBRow>
                                    </MDBCard>


                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <br /><br />
        </>
    )
}

export default SingleSellRequest
