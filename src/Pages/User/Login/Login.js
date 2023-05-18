import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Image from '../../../public/toa-heftiba-ip9R11FMbV8-unsplash.jpg'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form'
import { userLogin } from '../../../Redux/Actions/userActions/LoginActions'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../Error';
import Loading from '../../Loading';
import './Login.css'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLoginData = useSelector(state => state.userLogin)
  const { error, loading, userLoginDetails } = userLoginData

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data);
    dispatch(userLogin(email, password))
  }

  const { register, handleSubmit, formState: { errors } } = useForm();


  return (
    <MDBContainer className="my-5" >

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src={Image} alt="login form" className='rounded-start w-100' style={{ height: 550 }} />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2' style={{ color: '#355B3E' }}>
                <span className="h1 fw-bold mb-0"> <i class="fa-solid fa-book-open-reader" ></i>  LetterBox</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', marginBottom: '0' }}>Sign into your account</h5>

              <p style={{ margin: '0' }}> {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
                {loading ? <Loading /> : ""}</p>


              <form id='loginform' onSubmit={handleSubmit(onSubmit)}>
                <h3 style={{ marginBottom: "2%", marginTop: '0' }} >Login </h3>

                <p style={{ color: 'red', margin: '0' }}>{errors.email && "Enter a valid email address"}
                </p>
                <MDBInput wrapperClass='mb-3' label='Email address' id='formControlLg' type='email' size="lg"  {...register("email", { required: true })} onChange={(e) => setEmail(e.target.value)} />

                <p style={{ color: 'red', margin: '0' }}>{errors.password && "Enter a valid password"}
                </p>
                <MDBInput wrapperClass='mb-3' label='Password' id='formControlLg' type='password' size="lg"  {...register("password", { required: true })} onChange={(e) => setPassword(e.target.value)} />
                <MDBBtn className="px-5" size='lg' style={{ backgroundColor: '#355B3E', width: '100%' }}>Login</MDBBtn>
              </form>

              <Link to={'/signup'}>
                <p className="pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a style={{ color: '#393f81' }}>Register here</a></p>
              </Link>
              <Link to={'/otp-login'}>
                <p className="pb-lg-2" style={{ color: '#393f81' }}> <a style={{ color: '#393f81' }}>or Login with OTP</a></p>
              </Link>
              <Link to={'/password-reset'}>
                <p className="pb-lg-2" style={{ color: '#393f81' }}> <a style={{ color: '#393f81' }}>Forgot Password?</a></p>
              </Link>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer >
  );
}


export default Login;