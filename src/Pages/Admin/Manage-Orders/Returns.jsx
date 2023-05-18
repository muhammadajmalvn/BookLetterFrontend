import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { adminAcceptBookAction, adminGetReturnRequests } from '../../../Redux/Actions/adminActions/adminRetunActions';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import DoneIcon from '@mui/icons-material/Done';
import swal from 'sweetalert';

const Returns = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminGetReturnRequests())
    }, [])

    const adminReturn = useSelector((state) => state.adminReturnReducer)
    const { loading, adminReturnData, error } = adminReturn
    const handleAccept = (id, orderId, bookId, copyId) => {
        swal({
            title: "Are you sure?",
            text: "Accept this Book!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willAccept) => {
                if (willAccept) {
                    dispatch(adminAcceptBookAction(id, orderId, bookId, copyId));
                    swal("Book Accepted successfully!", {
                        icon: "success",
                    });
                } else {
                    swal("Book Accept cancelled!");
                }
            });
        dispatch(adminGetReturnRequests())
    };
    const data = {
        columns: [
            {
                label: 'Sl No',
                field: 'number',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Order Number',
                field: 'order',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Tracking Id',
                field: 'TrackingId',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Accept return',
                field: 'actions',
                sort: 'asc',
                width: 25
            },

        ],
        rows: adminReturnData?.map((item, index) => ({
            number: index + 1,
            order: item.orderId,
            TrackingId: item.trackingId,
            status: item.status,
            actions: (
                <div>
                    {item.status === 'pending' ?
                        <DoneIcon label="Accept" onClick={() => handleAccept(item._id, item.orderId, item.bookId, item.copyId)} style={{ color: 'green' }} /> : 'Book Accepted by Admin'
                    }
                </div>
            )
        })),
    }

    return (
        <>
            <Sidebar />
            <div className='w-75 mt-3 mx-auto '>
                <p style={{ margin: '0' }}>          {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "} </p>
                <p style={{ margin: '0' }}>          {loading ? <Loading variant='danger'>{error}</Loading> : " "} </p>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                />
            </div>
        </>
    )
}

export default Returns