import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.js'
import { adminGetAllSellAction } from '../../../Redux/Actions/adminActions/adminSellActions';

const Sell = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const orders = useSelector((state) => state.adminGetSellBooks)
    const { loading, adminSellBooks, error } = orders


    useEffect(() => {
        dispatch(adminGetAllSellAction())
    }, [])

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
                                    <th>Author</th>
                                    <th>Genre</th>
                                    <th>Asking Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminSellBooks ? adminSellBooks.map((order, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{order._id.substr(-5)}</td>
                                                    <td>{order.title}</td>
                                                    <td>{order.author}</td>
                                                    <td>{order.genre}</td>
                                                    <td>{order.askingPrice}</td>
                                                    <td>
                                                        <button className='btn btn-sm btn-primary' onClick={(e) => navigate('/admin/single-sellrequest-view', { state: { adminSellBooks, sellId: order._id } })}>View Details</button>
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

export default Sell