import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar'
import { adminGetAllBookAction, adminDeleteBookAction } from '../../../../Redux/Actions/adminActions/adminBookActions';
import './Books.css'
import swal from 'sweetalert';

const Books = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const books = useSelector((state) => state.adminGetAllBooks)
  const { loading, adminBookData, error } = books
  console.log(books, 'datassssssssssss');
  console.log(adminBookData, 'bookdata');
  useEffect(() => {
    dispatch(adminGetAllBookAction())
  }, [])

  const handleDeleteBook = async (id) => {
    swal({
      title: "Are you sure?",
      text: "The selected book will deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // Call the deleteUser function here if the user confirms the deletion
          dispatch(adminDeleteBookAction(id));
          swal("Book deleted successfully!", {
            icon: "success",
          });
        } else {
          swal("User deletion cancelled!");
        }
      });
  }

  return (
    <>
      <Box sx={{ display: 'flex', marginLeft: '6%', marginTop: '6%',zIndex:'-10' }}>

        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>

          <div className="table-responsive">

            <Table bordered hover striped="columns" variant="dark">
              <thead >
                <tr>
                  <th>Sl.No</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Quantity</th>
                  <th>Publisher</th>
                  <th>Price per Day</th>
                  <th>Edit/Delete Book</th>
                </tr>
              </thead>
              <tbody>
                {
                  adminBookData ? adminBookData.data.map((book, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.genre}</td>
                          <td>{book.quantity}</td>
                          <td>{book.publisher}</td>
                          <td>{book.price}</td>
                          <td><Button className='btn btn-dark' onClick={(e) => { navigate('/admin/edit-book', { state: { adminBookData: book } }) }}><i class="fa-sharp fa-solid fa-pen" style={{ color: 'cyan', fontSize: '150%' }}></i></Button>

                            <Button className='btn btn-dark' onClick={() => handleDeleteBook(book._id)}><i class="fa-sharp fa-solid fa-trash" style={{ color: 'red', fontSize: '150%' }}></i></Button> </td>
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

export default Books






