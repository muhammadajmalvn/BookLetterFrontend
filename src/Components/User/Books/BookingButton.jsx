import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function BookingButton({ bookId }) {
  const navigate = useNavigate()
  const books = useSelector((state) => state.userGetBooks)
  const { booksDataLoading, booksData, booksDataError } = books
  return (
    <Button
      label="Book Now" aria-label="Submit" icon="pi pi-shopping-bag" style={{ width: '75%', backgroundColor: '#355B3E', color: 'white', marginTop: '10px', marginLeft: '25px' }}
      onClick={() => navigate("/booking", { state: { booksData, bookId: bookId } })}

    >
      Book Now
    </Button>
  )
}

export default BookingButton
