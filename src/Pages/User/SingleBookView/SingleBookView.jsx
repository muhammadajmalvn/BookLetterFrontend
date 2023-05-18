import NavBar from '../Navbar/Navbar'
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../../Loading';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import BookingButton from '../../../Components/User/Books/BookingButton';
import Footer from '../Footer/Footer'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const SingleBookView = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [pickTime, setpickTime] = useState(null)
  const [dropTime, setDropTime] = useState(null)

  const { booksData } = location.state
  const clickedBook = booksData.find((book) => book._id === location.state.bookId)

  const mongoDate = clickedBook.publishedDate;
  const dateObject = new Date(mongoDate);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  return (
    <>
      <NavBar />
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2} style={{ boxShadow: '0.5px 0.5px' }} className='mt-2'>
          {/* <Item><h1>Single Book View</h1></Item> */}
        </Stack>
        <Card className='container mt-3'>
          {/* <Card.Header><h3>{clickedBook.title}</h3></Card.Header> */}
          <Card.Body>
            <div class="row">
              <div class="col-md-7 ">

                <Carousel fade>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={clickedBook.photo[0]}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      {/* <h3>{clickedBook.title}</h3> */}
                      <p></p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={clickedBook.photo[1]}
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      {/* <h3>{clickedBook.title}</h3> */}
                      <p></p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={clickedBook.photo[2]}
                      alt="Third slide"
                    />
                    <Carousel.Caption>
                      <p>

                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
              <div class="col-md-5 mt-3">
                <Card style={{ width: '22rem' }}>
                  <Card.Header><h3>{clickedBook.title}</h3></Card.Header>
                  <ListGroup variant="flush">&nbsp;
                    <ListGroup.Item>Book Title : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBook.title}</ListGroup.Item>
                    <ListGroup.Item>Author : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBook.author}</ListGroup.Item>
                    <ListGroup.Item>Publishers : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBook.publisher}</ListGroup.Item>
                    <ListGroup.Item>Published on: &nbsp;&nbsp;&nbsp;&nbsp;{dateString}</ListGroup.Item>
                    <ListGroup.Item>Genre : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBook.genre}</ListGroup.Item>
                    {/* <ListGroup.Item>Type : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBook.Assured ? "Assured" : "Not Assured"}</ListGroup.Item> */}
                    <ListGroup.Item>Price : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs.{clickedBook.price}(per day)</ListGroup.Item>
                  </ListGroup>
                </Card>


                <div className='description mt-2 ms-4' style={{ width: '22rem' }}>Description:&nbsp;&nbsp;{clickedBook.description}</div>
                <BookingButton bookId={clickedBook._id} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Box>
      <br /><br /><br />
      <Footer />
    </>
  );
}

export default SingleBookView



