import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavBar from '../Navbar/Navbar'
import { MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';

const Validityext = () => {
    const location = useLocation()
    const { orderedBooks } = location.state
    const clickedorder = orderedBooks.find((order) => order._id === location.state.orderId)

    const [newEndDate, setNewEndDate] = useState('');
    const handleExtendValidity = () => {

    };
    return (
        <>
            <NavBar />
            <h1>Extend Rental Validity</h1>
            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                <MDBCol>

                    <label htmlFor="">Title</label>
                    <MDBInput id='form3Example1' label='Title of Book' defaultValue={clickedorder?.title} />
                </MDBCol>
            </MDBRow>




            <MDBRow className='pt-2 ms-4 me-4 mb-4'>
                <MDBInput id='form3Example2' type='text' defaultValue={orderedBooks?.bookedTimeperiod?.endDate} />

                <MDBInput id='form3Example2' type='date' label='Published Date' />
            </MDBRow>


            <MDBContainer>
              <StripePayButton></StripePayButton>
            </MDBContainer>
            <Footer />
        </>
    )
}

export default Validityext