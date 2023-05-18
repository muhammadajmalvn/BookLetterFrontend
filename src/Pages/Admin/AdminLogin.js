import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../Redux/Actions/adminActions/adminLoginActions'
import { useForm } from 'react-hook-form'
import Spinner from 'react-bootstrap/esm/Spinner';
import ErrorMessage from '../Error';
import Loading from '../Loading';

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()


  const adminLoginData = useSelector(state => state.adminLogin)
  const { error, loading, userLoginDetails } = adminLoginData

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(adminLogin(email, password));
  };
  const { register, handleSubmit, formState: { errors } } = useForm();


  return (
    <MDBContainer >
      < MDBRow className='d-flex justify-content-center align-items-center h-10' >
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white mb-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <form id='loginform' onSubmit={handleSubmit(onSubmit)}>

                <MDBInput className='mb-4'
                  labelClass='text-white'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  placeholder='Email'
                  name='email'
                  size="lg"  {...register("email", { required: true })} onChange={(e) => {
                    setEmail(e.target.value)
                  }} />
                <MDBInput className='mb-3'
                  labelClass='text-white'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  placeholder='Password'
                  name='password'
                  {...register("password", { required: true })}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  size="lg" />
                {error && <div className="error_msg">{error}</div>}

                <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                <div className="text-center">
                  <MDBBtn outline className='px-5' color='white' size='lg'>
                    {loading && (
                      <Spinner className='me-2' animation="border" size="sm" />
                    )}
                    Login
                  </MDBBtn>
                </div>
              </form>
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>


            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow >

    </MDBContainer >
  )
}

export default AdminLogin