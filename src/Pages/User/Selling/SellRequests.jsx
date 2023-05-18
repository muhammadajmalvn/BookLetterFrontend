import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import NavBar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getsellRequestedBooksAction } from '../../../Redux/Actions/userActions/sellActions';
import { useNavigate } from 'react-router-dom';


const SellRequests = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const Books = useSelector((state) => state.getSellBooks)
  const { loading, sellBooks, error } = Books

  useEffect(() => {
    dispatch(getsellRequestedBooksAction())
  }, [])

  return (
    <>
      <NavBar />
      {sellBooks ? sellBooks.map((sellbook) => {
        return (
          <section style={{ backgroundColor: '#eee' }}>
            <div className="container py-1">
              <div className="row justify-content-center mb-3">
                <div className="col-md-12 col-xl-10 mt-4">
                  <div className="card shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <img src={sellbook.photo[0]}
                              className="w-25" />
                            <a href="#!">
                              <div className="hover-overlay">
                                <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                          <h5>{sellbook.title}</h5>
                          <div className="mt-1 mb-0 text-muted small">
                            <span>{sellbook.author}</span>
                            <span className="text-primary"> • </span>
                            <span>{sellbook.genre}</span>
                            <span className="text-primary"> • </span>
                            <span>{sellbook.publisher}<br /></span>
                          </div>
                          <div className="mb-2 text-muted small">
                            <span className="text-primary"> • </span>
                            <span>{sellbook.pages}</span>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                          <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">Rs {sellbook.askingPrice}</h4>
                          </div>
                          <div className="d-flex flex-column mt-4">
                            <button className="btn btn-primary btn-sm" onClick={(e) => navigate('/single-sell-view', { state: { sellBooks, sellId: sellbook._id } })}>Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        )
      }) : 'No Books listed for selling'}
      <Footer />
    </>
  )
}

export default SellRequests