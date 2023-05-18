import React, { useEffect } from 'react'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Box, Container, Divider, Typography } from '@mui/material'
import { userGetWalletAction } from '../../../Redux/Actions/userActions/walletActions'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact';

const Wallet = () => {
    const dispatch = useDispatch()
    const walletData = useSelector((state) => state.userGetWalletReducer?.walletData)
    console.log(walletData);
    const walletHistory = walletData?.walletHistory || []
    useEffect(() => {
        dispatch(userGetWalletAction())
    }, [])

    const data = {
        columns: [
            {
                label: 'Date',
                field: 'date',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Amount Added',
                field: 'amountAdded',
                width: 50
            },
            {
                label: 'Amount Deducted',
                field: 'amountDeducted',
                width: 50,
            },
            {
                label: 'Transaction Type',
                field: 'transactionType',
                width: 50
            },
        ],
        rows: walletHistory?.map((item, index) => ({
            date: item.Date,
            amountAdded: item.amountAdded ? item.amountAdded : '',
            amountDeducted: item.amountDeducted ? item.amountDeducted : '',
            transactionType: item.transactionType
        })
        )
    }
    return (
        <>
            <NavBar />
            <Container>
                <Box sx={{ marginTop: '10%' }}>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>Wallet Histroy</Typography>
                    <Typography variant='h6' sx={{ textAlign: 'left' }}>Wallet Balance : Rs {walletData?.walletAmount}</Typography>
                </Box>
                <Box>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={data}
                    />
                </Box>
            </Container >
            <br /><br /><br /><br />
            <Footer />
        </>
    )
}

export default Wallet