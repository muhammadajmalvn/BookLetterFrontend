import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBProgress,
    MDBProgressBar,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from 'react-router-dom';
import { adminGetAllOrdersAction } from '../../../Redux/Actions/adminActions/adminOrderActions';
import { adminChangeOrderStatusAPI } from '../../../APIs/adminAPI';
import { useDispatch } from 'react-redux';

const SingleOrder = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { adminOrderData } = location.state
    const clickedOrder = adminOrderData.find((order) => order._id === location.state.orderId)

    const [status, setStatus] = useState('');

    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
    }
    const handleSubmitStatus = async (orderId) => {
        try {
            adminChangeOrderStatusAPI(orderId, status).then((response) => {
                dispatch(adminGetAllOrdersAction())
                console.log(response.data);
                navigate('/admin/orders');
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
                                            Order Details
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
                                                        src={clickedOrder.photo}
                                                        fluid
                                                        alt="Phone"
                                                    />
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0">{clickedOrder.title}</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">{new Date(clickedOrder.bookedTimePeriod.startDate).toLocaleDateString()} to {new Date(clickedOrder.bookedTimePeriod.endDate).toLocaleDateString()}</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">
                                                        {clickedOrder.rentPerDay}
                                                    </p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">{clickedOrder.totalDays} days</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md="2"
                                                    className="text-center d-flex justify-content-center align-items-center"
                                                >
                                                    <p className="text-muted mb-0 small">Rs {clickedOrder.totalAmount}</p>
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
                                                                <div className="py-1 px-2 rounded text-white d-flex justify-content-between" style={{ backgroundColor: status.status === 'placed' ? '#f37a27' : status.status === 'shipped' ? 'blue' : status.status === 'delivered' ? '#4caf50' : status.status === 'return accepted' ? '#4caf50' : '#f37a27' }}>
                                                                    {status.status}
                                                                </div>
                                                                <div className="py-1 px-2 rounded text-white d-flex justify-content-around" style={{ backgroundColor: status.status === 'placed' ? '#f37a27' : status.status === 'shipped' ? 'blue' : status.status === 'delivered' ? '#4caf50' : status.status === 'return accepted' ? '#4caf50' : '#f37a27' }}>
                                                                    {new Date(status.date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                                                                </div>
                                                            </li>
                                                        </MDBCol>
                                                    )
                                                }) : ''}
                                            </MDBRow>
                                        </MDBCardBody>
                                        <div className='d-flex mx-auto my-auto'>
                                            {clickedOrder.status === "placed" && (
                                                <select onChange={(e) => handleChangeStatus(e.target.value)} style={{ backgroundColor: "white", border: "1px solid black" }}>
                                                    <option value="{clickedOrder.status}">{clickedOrder.status}</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            )}
                                            {clickedOrder.status === "shipped" && (
                                                <select onChange={(e) => handleChangeStatus(e.target.value)}>
                                                    <option value="{clickedOrder.status}">{clickedOrder.status}</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            )}
                                            {clickedOrder.status === "delivered" && <span></span>}
                                            <button onClick={() => handleSubmitStatus(clickedOrder._id)} disabled={clickedOrder.status === "delivered"} className='btn btn-sm btn-primary ms-2 '>
                                                Save
                                            </button>
                                        </div>
                                    </MDBCard>



                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="fw-bold mb-0">Delivery Address</p>
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Total</span> {clickedOrder.totalAmount}
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="text-muted mb-0">{clickedOrder.address.addressLine1}</p>
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Delivery Charges</span>{" "}
                                            Free
                                        </p>

                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">
                                            {clickedOrder.address.addressLine2}
                                        </p>

                                    </div>

                                    <div className="d-flex justify-content-between mb-5">
                                        <p className="text-muted mb-0">
                                            {clickedOrder.address.state}-{clickedOrder.address.postcode}
                                        </p>
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Total Paid</span> {clickedOrder.totalAmount}
                                        </p>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    )
}

export default SingleOrder
