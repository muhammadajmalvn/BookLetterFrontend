import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box } from '@mui/material'
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { adminAddGenreAction, adminGetAllGenreAction, deleteGenre } from '../../../Redux/Actions/adminActions/adminGenreActions';
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../Error';
import Loading from '../../Loading';
import swal from 'sweetalert';


const Category = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [genre, setGenre] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()


  const genreAdded = useSelector(state => state.adminGenreAdd)
  const { addLoading, addError, genreAdd } = genreAdded


  const adminGenres = useSelector(state => state.adminGenreReducer)
  const { loading, error, genreData } = adminGenres
  const onSubmit = (data) => {
    dispatch(adminAddGenreAction(genre));
    dispatch(adminGetAllGenreAction())
  }
  useEffect(() => {
    dispatch(adminGetAllGenreAction())
  }, [])


  const handleDeleteGenre = async (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this genre!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          dispatch(deleteGenre(id));
          swal("Genre deleted successfully!", {
            icon: "success",
          });
        } else {
          swal("Genre deletion cancelled!");
        }
      });
    dispatch(adminGetAllGenreAction());
  }
  return (
    <>
      <Box sx={{ display: 'flex', marginLeft: '6%', marginTop: '6%', zIndex: '-10' }}>

        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>

          <div className="table-responsive">
            <p style={{ margin: '0' }}>          {addError ? <ErrorMessage variant='danger'>{addError}</ErrorMessage> : " "} </p>
            <p style={{ margin: '0' }}>          {loading ? <Loading variant='danger'>{addError}</Loading> : " "} </p>
            <Form id='addgenreform' onSubmit={handleSubmit(onSubmit)} className='ms-5'>
              <p style={{ color: 'red', margin: '0' }}>{errors.genre && "Enter a valid genre"}
              </p>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="enter genre name"
                  autoFocus
                  {...register("genre", { required: true })} onChange={(e) => setGenre(e.target.value)} className='w-50' />
              </Form.Group>
              <Button className='btn btn-dark' type='submit'>Add</Button>
            </Form>
            <Table bordered hover striped="columns" variant="dark" className='w-75 mx-5 mt-3'>
              <thead >
                <tr>
                  <th>Sl.No</th>
                  <th>Genre</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  genreData ? genreData.data.filter(genres => !genres.isDeleted).map((genre, index) => {
                    return (
                      <>
                        <tr>
                          <td key={index}>{index + 1}</td>
                          <td>{genre.name}</td>

                          <td>

                            <Button className='btn btn-dark' onClick={() => handleDeleteGenre(genre._id)}><i class="fa-sharp fa-solid fa-trash" style={{ color: 'red', fontSize: '150%' }}></i></Button> </td>
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

export default Category