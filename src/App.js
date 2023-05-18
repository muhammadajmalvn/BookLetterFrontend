import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import NotFound from './Pages/NotFound';
import Validityext from './Pages/User/Booking/Validityext';


const Signup = lazy(() => import('./Pages/User/Signup/Signup'))
const Login = lazy(() => import('./Pages/User/Login/Login'))
const Homepage = lazy(() => import('./Pages/User/Homepage/Homepage'))
const UserProfile = lazy(() => import('./Pages/User/UserProfile/UserProfile'))
const BooksView = lazy(() => import('./Pages/User/BooksView/BooksView'))
const SellBooks = lazy(() => import('./Pages/User/Selling/SellBooks'))
const SellRequests = lazy(() => import('./Pages/User/Selling/SellRequests'))
const SingleSellView = lazy(() => import('./Pages/User/Selling/SingleSellView'))
const Wallet = lazy(() => import('./Pages/User/Wallet/Wallet'))
const Chat = lazy(() => import('./Pages/User/Chat/Chat'))


const AdminLogin = lazy(() => import('./Pages/Admin/AdminLogin'))
const Dashboard = lazy(() => import('./Pages/Admin/Dashboard/Dashboard'))
const UserManage = lazy(() => import('./Pages/Admin/Manage-User/UserManage'))
const Books = lazy(() => import('./Pages/Admin/Manage-Books/View-Books/Books'))
const AddBook = lazy(() => import('./Pages/Admin/Manage-Books/Add-Book/AddBook'))
const EditBook = lazy(() => import('./Pages/Admin/Manage-Books/Edit-Book/Edit-Book'))
const SingleBookView = lazy(() => import('./Pages/User/SingleBookView/SingleBookView'))
const Category = lazy(() => import('./Pages/Admin/Manage-Category/Category'))
const Booking = lazy(() => import('./Pages/User/Booking/Booking'))
const OrderedBooks = lazy(() => import('./Pages/User/Booking/OrderedBooks'))
const OrderSuccess = lazy(() => import('./Pages/User/Booking/OrderSuccess'))
const OtpLogin = lazy(() => import('./Pages/User/OTP-Login/OtpLogin'))
const ForgotPassword = lazy(() => import('./Pages/User/Login/ForgotPassword'))
const PasswordReset = lazy(() => import('./Pages/User/Login/PasswordReset'))



const Orders = lazy(() => import('./Pages/Admin/Manage-Orders/Orders'))
const SingleOrder = lazy(() => import('./Pages/Admin/Manage-Orders/SingleOrder'))
const Returns = lazy(() => import('./Pages/Admin/Manage-Orders/Returns'))
const SellReq = lazy(() => import('./Pages/Admin/Sell-Requests/Sell'))
const SingleSellRequest = lazy(() => import('./Pages/Admin/Sell-Requests/SingleSellRequest'))
const SalesReport = lazy(() => import('./Pages/Admin/SalesReport/SalesReport'))


const App = () => {
  const userData = useSelector((state) => state.userLogin.userLoginDetails)
  const adminData = useSelector((state) => state.adminLogin.adminLoginDetails)
  return (
    <div>
      <Router>

        <Suspense fallback={<div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
          <span>Loading</span>
        </div>
        }>
          <Routes>
            <Route path='/' exact element={<Homepage />} />
            <Route path='/signup' element={userData ? <Navigate to='/' /> : <Signup />} />
            <Route path='/login' element={userData ? <Navigate to='/' /> : <Login />} />
            <Route path='/otp-login' element={userData ? <Navigate to='/' /> : <OtpLogin />} />
            <Route path='/profile' exact element={userData ? <UserProfile /> : <Login />} />
            <Route path='/books' exact element={<BooksView />} />
            <Route path='/single-book-view' exact element={<SingleBookView />} />
            <Route path='/booking' exact element={userData ? <Booking /> : <Login />} />
            <Route path='/ordered-book' exact element={userData ? <OrderedBooks /> : <Login />} />
            <Route path='/sell-books' exact element={userData ? <SellBooks /> : <Login />} />
            <Route path='/validity-extend' exact element={userData ? <Validityext /> : <Login />} />
            <Route path='/booking-success' exact element={< OrderSuccess />} />
            <Route path='/sell-requests' exact element={userData ? <SellRequests /> : <Login />} />
            <Route path='/single-sell-view' exact element={userData ? < SingleSellView /> : <Login />} />
            <Route path='/wallet' exact element={userData ? <Wallet /> : <Login />} />
            <Route path='/chat' exact element={userData ? <Chat /> : <Login />} />
            <Route path='/password-reset' exact element={<PasswordReset />} />
            <Route path='/forgotpassword/:id/:token' exact element={<ForgotPassword />} />
            <Route path='*' element={<NotFound />} />



            <Route path='/admin' exact element={adminData ? <Dashboard /> : <AdminLogin />} />
            <Route path='/admin/users' exact element={adminData ? <UserManage /> : <AdminLogin />} />
            <Route path='/admin/books' exact element={adminData ? <Books /> : <AdminLogin />} />
            <Route path='/admin/add-book' exact element={adminData ? <AddBook /> : <AdminLogin />} />
            <Route path='/admin/edit-book' exact element={adminData ? <EditBook /> : <AdminLogin />} />
            <Route path='/admin/genre' exact element={adminData ? <Category /> : <AdminLogin />} />
            <Route path='/admin/orders' exact element={adminData ? <Orders /> : <AdminLogin />} />
            <Route path='/admin/single-order-view' exact element={adminData ? <SingleOrder /> : <AdminLogin />} />
            <Route path='/admin/returns' exact element={adminData ? <Returns /> : <AdminLogin />} />
            <Route path='/admin/sell-request' exact element={adminData ? <SellReq /> : <AdminLogin />} />
            <Route path='/admin/single-sellrequest-view' exact element={adminData ? <SingleSellRequest /> : <AdminLogin />} />
            <Route path='/admin/sales-report' exact element={adminData ? <SalesReport /> : <AdminLogin />} />


          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App

