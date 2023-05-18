import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
function Footer() {
    return (
        <MDBFooter bgColor='white' className='text-center text-lg-left' >
            <div className='text-center p-3 text-white' style={{ backgroundColor: 'rgb(53, 91, 62)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-white' href='/home'>
                    www.bookletter.shop
                </a>
            </div>
        </MDBFooter>
    );
}
export default Footer;