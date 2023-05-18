import React, { useState } from 'react'
import NavBar from '../Navbar/Navbar'
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography, FormLabel, RadioGroup, Radio } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"
import { useEffect } from 'react';
import { DatePicker } from "antd"
import Footer from '../Footer/Footer';
import AddressModal from '../../../Components/User/Modals/AddressModal';
import { getAddressAction } from '../../../Redux/Actions/userActions/addressActions';
import { useDispatch, useSelector } from 'react-redux';
import { userGetWalletAction } from '../../../Redux/Actions/userActions/walletActions';
import { userOrderBookAction } from '../../../Redux/Actions/userActions/orderActions';
import { userOrderAPI } from '../../../APIs/userAPI';
import swal from 'sweetalert';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const { RangePicker } = DatePicker

const Booking = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()

  const { booksData } = location.state;
  const clickedBook = booksData?.find((book) => book._id === location.state.bookId)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [totalDays, setTotalDays] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const walletAmount = useSelector((state) => state.userGetWalletReducer?.walletData)
  useEffect(() => {
    dispatch(userGetWalletAction())
  }, [])

  const handleBookNow = () => {
    if (wallet === false && stripe == true) {
      setWalletError(false)
      dispatch(userOrderBookAction(stripeData))
    } else if (wallet === true && stripe === false) {
      if (walletAmount?.walletAmount >= totalAmount) {
        userOrderAPI(walletBookingData).then((data) => {
          swal(
            'Congrats!',
            'You booking is successful!',
            'success'
          ).then(() => {
            navigate('/ordered-book')
          })
        })
      } else {
        setWalletError(true)
      }
    }
  }

  const [stripe, setStripe] = useState(false)
  const [value, setValue] = useState("")

  const [wallet, setWallet] = useState(false)
  const [walletError, setWalletError] = useState(false)

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [showModal, setShowModal] = useState(false);

  const handleAddAddress = () => {
    setShowModal(true);
  };
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState(false)
  const handleAddressSelect = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
    setAddress(true)
  };

  const stripeData = {
    userId: JSON.parse(localStorage.getItem("user-login")).id,
    userName: JSON.parse(localStorage.getItem("user-login")).firstName,
    bookId: clickedBook._id,
    bookData: clickedBook,
    totalAmount,
    totalDays,
    address: selectedAddress,
    bookedTimePeriod: {
      startDate,
      endDate
    },
    paymentType: "stripe"
  }

  const walletBookingData = {
    userId: JSON.parse(localStorage.getItem("user-login")).id,
    userName: JSON.parse(localStorage.getItem("user-login")).firstName,
    bookId: clickedBook._id,
    bookData: clickedBook,
    totalAmount,
    totalDays,
    address: selectedAddress,
    bookedTimePeriod: {
      startDate,
      endDate
    },
    paymentType: "wallet",
    walletId: walletAmount?._id
  }

  const addressData = useSelector((state) => state.userAddressReducer)
  const { loading, addresses, error } = addressData
  useEffect(() => {
    dispatch(getAddressAction())
  }, [dispatch, AddressModal])

  const selectDaySlots = (values) => {
    setStartDate(values[0].format('DD MM YYYY'))
    setEndDate(values[1].format('DD MM YYYY'))
    setTotalDays(values[1].diff(values[0], 'days'))
  }

  const disabledDate = (current) => {
    // Disable dates on or after 3 days from today
    return current && current <= moment().add(3, "days").endOf("day");
  };

  useEffect(() => {
    setTotalAmount(totalDays * clickedBook?.price)
  }, [totalDays])

  return (
    <>
      <NavBar />
      <br />
      <Container maxWidth="lg" >
        <Container maxWidth="md" sx={{ display: 'flex', gap: 2 }}>
          <Box maxWidth="md" sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <img src={clickedBook ? clickedBook.photo[0] : ''}
              height={300}
              width={300}
              alt='d' />
          </Box>
          <Box maxWidth="md" sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: "600px" }}>
            {/* <Typography variant="h4" sx={{ textAlign: 'center', my: 1 }}>Book Details</Typography> */}
            <Container maxWidth="md" >
              <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold' }}>Book Title: {clickedBook?.title}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Author: {clickedBook?.author}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Description: {clickedBook?.description}.</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Rent Per Day: Rs {clickedBook?.price}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Genre: {clickedBook?.genre}</Typography>
            </Container>
          </Box>
        </Container>

        <Container maxWidth="md">
          <Container>
            <Typography variant="h6" sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', my: 2 }}>Book your copy with us now</Typography>
          </Container>
          <Container maxWidth="md">
            <div>
              <div className='container'>
                <div className='row'>
                  <div className='d-flex justify-content-end'>
                    <button className='btn btn-success' onClick={handleAddAddress}>
                      Address+
                    </button>
                  </div>
                </div>
              </div>
              <AddressModal isOpen={showModal} onRequestClose={() => setShowModal(false)} />
            </div>
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.isArray(addresses) && addresses.map((address) => {
                  return (
                    <div className='md-3 ms-5'>
                      <div className="grid">
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          onChange={() => handleAddressSelect(address)}
                        />
                        <span className="plan-details">
                          <div className="card bg-warning px-2">
                            <span className="plan-type">{address.addressLine1}</span>
                            <span className="pt-1">{address.addressLine2}</span>
                            <span>{address.state}</span>
                            <span>{address.postcode}</span>
                            <span>{address.phoneNumber}</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Box>
            <br /><br />

            <Box sx={{ height: "50px", mt: 3 }}>
              <Typography>
                Select Date Range
              </Typography>
              <RangePicker
                showTime={{ format: "MM DD YYYY" }}
                format="MM DD YYYY"
                style={{ width: "100%", height: "100%" }}
                onChange={selectDaySlots}
                disabledDate={disabledDate}
              />
            </Box>

            <br />
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
              <Typography variant="h6">Rent per Day : {clickedBook?.price}/day</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
              <Typography variant="h6">Total Day :{totalDays} days</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
              <Typography variant='h6'>Total Amount : Rs {totalAmount} </Typography>
            </Box>
            {/* <StripePayButton bookingData={bookingData} /> */}
            <Container sx={{ display: 'flex', mt: 2 }} >
              <Box>
                <FormControl>
                  {walletError ?
                    <p style={{ color: 'red' }}>Insufficient wallet amount</p>
                    : ' '}
                  <FormLabel id="demo-row-radio-buttons-group-label">Payment</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="wallet"
                      control={<Radio />}
                      label="With Wallet"
                      onChange={() => {
                        setWallet(true)
                        setStripe(false)
                      }}
                    />

                    <FormControlLabel
                      value="stripe"
                      control={<Radio />}
                      label="With Stripe"
                      onChange={() => {
                        setStripe(true)
                        setWallet(false)
                        setWalletError(false)
                      }}
                    />

                  </RadioGroup>
                </FormControl>
              </Box>
            </Container>
            <Container>
              {
                wallet && address || stripe && address ? <Button
                  variant='outlined'
                  fullWidth
                  onClick={handleBookNow}
                  sx={{
                    mt: 2, backgroundColor: "#355B3E", color: 'white', "&.MuiButtonBase-root:hover": {
                      bgcolor: "#6366F1"
                    }
                  }}>CheckOut</Button>
                  :
                  <Button
                    variant='outlined'
                    fullWidth
                    disabled
                    sx={{ backgroundColor: "#355B3E" }}>CheckOut</Button>
              }
            </Container>
            <br /><br />
          </Container>
        </Container>
      </Container>
      <Footer />
    </>
  )
}
export default Booking