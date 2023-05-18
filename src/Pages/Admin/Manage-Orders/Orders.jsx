import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { adminGetAllOrdersAction } from '../../../Redux/Actions/adminActions/adminOrderActions';
import Sidebar from '../Sidebar/Sidebar.js'
import { adminChangeOrderStatusAPI } from '../../../APIs/adminAPI';

const Orders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const orders = useSelector((state) => state.adminOrderReducer)
    const { loading, adminOrderData, error } = orders


    const [status, setStatus] = useState('');

    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
    }
    useEffect(() => {
        dispatch(adminGetAllOrdersAction())
    }, [])
    const handleSubmitStatus = async (orderId) => {
        try {
            adminChangeOrderStatusAPI(orderId, status).then((response) => {
                dispatch(adminGetAllOrdersAction())
                console.log(response.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', marginLeft: '6%', marginTop: '6%', zIndex: '-10' }}>

                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>

                    <div className="table-responsive">

                        <Table bordered hover striped="columns" variant="dark">
                            <thead >
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Order No</th>
                                    <th>Title</th>
                                    {/* <th>BookId</th> */}
                                    {/* <th>CopyId</th> */}
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Address</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminOrderData ? adminOrderData.map((order, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{order._id.substr(-5)}</td>
                                                    <td>{order.title}</td>
                                                    {/* <td>{order.bookingId.substr(-5)}</td> */}
                                                    {/* <td>{order.copyId?.substr(-5)}</td> */}
                                                    <td>{new Date(order.bookedTimePeriod.startDate).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                                    <td>{new Date(order.bookedTimePeriod.endDate).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                                    <td>{order.address.addressLine1} <br />
                                                        {order.address.addressLine2}<br />
                                                        {order.address.postcode}<br />
                                                        {order.address.phoneNumber}<br />
                                                    </td>
                                                    <td>{order.totalAmount}</td>
                                                    <td>{order.status} </td>
                                                    <td>
                                                        {/* {order.status === "placed" && (
                                                            <select onChange={(e) => handleChangeStatus(e.target.value)}>
                                                                <option value="{order.status}">{order.status}</option>
                                                                <option value="shipped">Shipped</option>
                                                                <option value="delivered">Delivered</option>
                                                            </select>
                                                        )}
                                                        {order.status === "shipped" && (
                                                            <select onChange={(e) => handleChangeStatus(e.target.value)}>
                                                                <option value="{order.status}">{order.status}</option>
                                                                <option value="delivered">Delivered</option>
                                                            </select>
                                                        )}
                                                        {order.status === "delivered" && <span>Delivered</span>}
                                                        <button onClick={() => handleSubmitStatus(order._id)} disabled={order.status === "delivered"} className='btn btn-sm btn-primary ms-2 '>
                                                            Save
                                                        </button> */}
                                                        <button className='btn btn-sm btn-primary' onClick={(e) => navigate('/admin/single-order-view', { state: { adminOrderData, orderId: order._id } })}>View Details</button>
                                                    </td>

                                                </tr>
                                            </>
                                        )
                                    }) : ''
                                }
                            </tbody>
                        </Table>
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default Orders