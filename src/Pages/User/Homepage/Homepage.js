import React from 'react'
import Navbar from '../../../Pages/User/Navbar/Navbar'
import Banner from '../../../Components/User/Banner';
import Poster from '../../../Components/User/Poster';
import orderImg from '../../../public/enquire-n-Order-details-jpg'
import bannerImg from '../../../public/bannar.jpg'
import Footer from '../Footer/Footer';


const HomePage = () => {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#f2f2f2' }}>
        <div style={{ backgroundColor: '#fff' }}>
          <div>
            <Banner image={bannerImg} />
          </div>

          <div style={{ height: 'auto' }}>
            <Poster title={'Rent Book with us at easy steps:'} image={orderImg} />
          </div>

          <div style={{ height: 'auto' }}>
            <Poster title={'Sell Book with us at easy steps:'} image={orderImg} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
