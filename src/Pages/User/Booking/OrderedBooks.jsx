import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import NavBar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderedBooksAction, userOrderReturnAction } from '../../../Redux/Actions/userActions/orderActions';
import { Button } from '@mui/material';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Box from '@mui/material/Box';

const OrderedBooks = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const userId = JSON.parse(localStorage.getItem("user-login")).id
    const Books = useSelector((state) => state.getorderedBooks)
    const { loading, orderedBooks, error } = Books
    console.log(orderedBooks);




    useEffect(() => {
        dispatch(getOrderedBooksAction(userId))
    }, [])

    const handleReturn = (orderId, trackingId) => {
        console.log(trackingId);
        console.log(orderId);
        dispatch(userOrderReturnAction(orderId, trackingId));
        dispatch(getOrderedBooksAction(userId));
        handleCloseModal();
    };

    const [currentOrderId, setCurrentOrderId] = useState(null);

    const handleReturnClick = (orderId) => {
        setCurrentOrderId(orderId);
        handleOpenModal();
    };

    const handleModalSubmit = () => {
        handleReturn(currentOrderId, trackingId);
        handleCloseModal();
    };

    const today = new Date().toISOString()

    const [trackingId, setTrackingId] = useState('');
    const handleTrackingIdChange = (e) => {
        setTrackingId(e.target.value);
    }

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setTrackingId('');
    };
    return (
        <>
            <NavBar />
            <section className="h-100 h-custom" style={{ backgroundColor: "" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>Orders </h1>
                </Box>
                <MDBContainer className="pt-2 pb-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="8" xl="12">
                            {/* <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>
                               Your Orders
                            </p> */}
                            {orderedBooks ? orderedBooks.map((book) => {
                                return (
                                    <MDBCard className="border-top border-bottom border-3 border-color-custom mt-3 " key={book._id}>
                                        <MDBCardBody className="p-5">
                                            <MDBRow>
                                                <MDBCol className="mb-3">
                                                    <p className="small text-muted mb-1">Date</p>
                                                    <p>{new Date(book.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                </MDBCol>
                                                <MDBCol className="mb-3">
                                                    <p className="small text-muted mb-1">Order No.</p>
                                                    <p>{book._id}</p>
                                                </MDBCol>
                                            </MDBRow>

                                            <div
                                                className="mx-n5 px-5 py-4"
                                                style={{ backgroundColor: "#f2f2f2" }}
                                            >
                                                <MDBRow>
                                                    {/* <MDBCol className='w-25'>
                                                        <MDBCardImage src={book.photo} alt="Card image" className='w-50 h-50 ' />
                                                    </MDBCol> */}
                                                    <MDBCol>
                                                        <MDBRow>
                                                            <h5>Shipping Address</h5>
                                                            <span>{book.address.addressLine1}</span>
                                                            <span>{book.address.addressLine2}</span>
                                                            <span>{book.address.state}</span>
                                                            <span>{book.address.phoneNumber}</span>
                                                            <MDBRow>
                                                                <span>{new Date(book.bookedTimePeriod.startDate).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })} to {new Date(book.bookedTimePeriod.endDate).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
                                                            </MDBRow>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="8" lg="9">
                                                        <p>{book.title}</p>
                                                    </MDBCol>
                                                    <MDBCol md="4" lg="3">
                                                        <p>Rs {book.totalAmount}</p>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="8" lg="9">
                                                        <p className="mb-0">Shipping</p>
                                                    </MDBCol>
                                                    <MDBCol md="4" lg="3">
                                                        <p className="mb-0">Free</p>
                                                    </MDBCol>
                                                </MDBRow>
                                            </div>
                                            <MDBRow className="my-4">
                                                <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                                                    <p
                                                        className="lead fw-bold mb-0"
                                                        style={{ color: "#f37a27" }}
                                                    >
                                                        Rs {book.totalAmount}
                                                    </p>
                                                </MDBCol>
                                            </MDBRow>

                                            <p
                                                className="lead fw-bold mb-4 pb-2"
                                            >
                                                Order History
                                            </p>

                                            <MDBRow>
                                                <MDBCol lg="12 d-flex justify-content-between">
                                                    {book.statusHistory ? book.statusHistory.map((status) => {
                                                        return (
                                                            <li className="list-inline-item items-list ">
                                                                <div className="py-1 px-2 rounded text-white d-flex justify-content-between" style={{ backgroundColor: status.status === 'placed' ? '#f37a27' : status.status === 'shipped' ? 'blue' : status.status === 'delivered' ? '#4caf50' : status.status === 'return accepted' ? '#4caf50' : '#f37a27' }}>
                                                                    {status.status}
                                                                </div>
                                                                <div className="py-1 px-2 rounded text-white d-flex justify-content-around" style={{ backgroundColor: status.status === 'placed' ? '#f37a27' : status.status === 'shipped' ? 'blue' : status.status === 'delivered' ? '#4caf50' : status.status === 'return accepted' ? '#4caf50' : '#f37a27' }}>
                                                                    {new Date(status.date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                                                                </div>
                                                            </li>
                                                        );
                                                    }) : ''}
                                                    <br /><br />
                                                    <div className='d-flex justify-content-end'>

                                                        <div>
                                                            {book.status === "delivered" && (
                                                                <Button variant="contained" color="primary" onClick={() => handleReturnClick(book._id)}>Return</Button>
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
                                                        </div>
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>

                                )
                            }) : (
                                <p>No orders to display</p>
                            )}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <Footer />
        </>
    )
}

const customStyles = {
    content: {
        top: '20%',
    },
};
export default OrderedBooks


