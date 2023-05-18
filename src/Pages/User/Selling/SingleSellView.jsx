import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
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
import Footer from '../Footer/Footer';
import { Button } from '@mui/material';
import Modal from 'react-modal';
import { userSendSelledBookAction } from '../../../Redux/Actions/userActions/sellActions';

const SingleOrder = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { sellBooks } = location.state
    const clickedOrder = sellBooks.find((order) => order._id === location.state.sellId)
    const userId = JSON.parse(localStorage.getItem("user-login")).id


    const [trackingId, setTrackingId] = useState('');
    const handleTrackingIdChange = (e) => {
        setTrackingId(e.target.value);
    }
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const handleSendClick = (orderId) => {
        setCurrentOrderId(orderId);
        handleOpenModal();
    };
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setTrackingId('');
    };

    const handleModalSubmit = () => {
        handleSend(currentOrderId, trackingId);
        handleCloseModal();
    };
    const handleSend = (orderId, trackingId) => {
        dispatch(userSendSelledBookAction(orderId, trackingId));
        handleCloseModal();
        navigate('/sell-requests')
    };

    return (
        <>
            <Navbar />
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
                                                    <p className="text-muted mb-0 small">Genre:{clickedOrder.genre}</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">Asking Price: Rs {clickedOrder.askingPrice}</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">Status: {clickedOrder.status}</p>
                                                </MDBCol>
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
                                            <MDBRow>
                                                {clickedOrder.status === "accepted" && (
                                                    <div className='d-flex justify-content-end mt-3'>
                                                        <Button variant="contained" color="primary" onClick={() => handleSendClick(clickedOrder._id)}>Send Book</Button>
                                                    </div>
                                                )}
                                                <Modal isOpen={showModal} toggle={handleCloseModal} style={customStyles}>
                                                    <h2 toggle={handleCloseModal}>Enter Tracking ID</h2>
                                                    <div>
                                                        <input type="text" className="form-control mb-3" placeholder="Tracking ID" value={trackingId} onChange={handleTrackingIdChange} />
                                                    </div>
                                                    <div>
                                                        <Button variant="contained" color="primary" onClick={handleModalSubmit}>Submit</Button>
                                                        <Button variant="contained" color="secondary" onClick={handleCloseModal}>Cancel</Button>
                                                    </div>
                                                </Modal>
                                            </MDBRow>
                                        </MDBCardBody>

                                    </MDBCard>


                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <br /><br />
            <Footer />
        </>
    )
}
const customStyles = {
    content: {
        top: '20%',
    },
};
export default SingleOrder
