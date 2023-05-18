import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Image from '../../../public/julia-kicova-JSOnWnJx_rc-unsplash.jpg'
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

import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../../../Redux/Actions/userActions/SignupActions'
import { useForm } from 'react-hook-form'
import Loading from '../../Loading';
import ErrorMessage from '../../Error';

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signup = useSelector(state => state.userSignup)
  const { loading, error, userInfo } = signup

  const onSubmit = (data) => {
    console.log(data);
    dispatch(userSignup(firstName, lastName, email, phone, password))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);



  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <MDBContainer className="my-5">

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

              <p style={{ margin: '0' }}>          {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
                {loading ? <Loading /> : ""}
              </p>
              <h5 className="fw-normal my-2 pb-3" style={{ letterSpacing: '1px' }}>Create Account</h5>


              <form id='signupform' onSubmit={handleSubmit(onSubmit)}>


                <p style={{ color: 'red', margin: '0' }}>{errors.firstName && "Enter a valid first name"}
                </p>
                <MDBInput wrapperClass='mb-3' label='First Name' id='formControlLg' type='text' size="lg" {...register("firstName", { required: true, maxLength: '10' })} onChange={(e) => setfirstName(e.target.value)} />


                <p style={{ color: 'red', margin: '0' }}>{errors.lastName && "Enter a valid last name"}
                </p>
                <MDBInput wrapperClass='mb-3' label='Last Name' id='formControlLg' type='text' size="lg"  {...register("lastName", { required: true, maxLength: '10' })} onChange={(e) => setlastName(e.target.value)} />


                <p style={{ color: 'red', margin: '0' }}>{errors.email && "Enter a valid email address"}
                </p>
                <MDBInput wrapperClass='mb-3' label='Email address' id='formControlLg' type='email' size="lg"  {...register("email", { required: true, minLength: '10' })} onChange={(e) => setEmail(e.target.value)} />


                <p style={{ color: 'red', margin: '0' }}>{errors.phone && "Enter a valid mobile number"}
                </p>
                
                <MDBInput wrapperClass='mb-3' label='Mobile Number' id='formControlLg' type='phone' size="lg"  {...register("phone", { required: true, minLength: '10', maxLength: '10' })} onChange={(e) => setPhone(e.target.value)} />


                <p style={{ color: 'red', margin: '0' }}>{errors.password && "Enter a valid password"}
                </p>
                <MDBInput wrapperClass='mb-3' label='Password' id='formControlLg' type='password' size="lg"  {...register("password", { required: true, minLength: '6', maxLength: '16' })} onChange={(e) => setPassword(e.target.value)} />

                <MDBBtn className="px-5" size='lg' style={{ backgroundColor: '#355B3E', width: '100%' }}>Signup</MDBBtn>

              </form>

              <Link to={'/login'}>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account? <a style={{ color: '#393f81' }}>Login here</a></p>
              </Link>
            </MDBCardBody>  
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer >
  );
}


export default Signup;