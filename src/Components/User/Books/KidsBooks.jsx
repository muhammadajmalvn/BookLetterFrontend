import { React, useEffect } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mantine/core';
import { userGetGenreBooksAction } from '../../../Redux/Actions/userActions/bookActions'
import Loading from '../../../Pages/Loading'
import Button from './BookingButton'

function KidsBooks() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const books = useSelector((state) => state.userGetBooks)
    const { booksDataLoading, booksData, booksDataError } = books

    useEffect(() => {
        dispatch(userGetGenreBooksAction('Kids'))
    }, [])

    return (
        <>
            <Box>
                <div className='d-flex flex-wrap justify-content-center  '>
                    {
                        booksDataLoading ? <Loading /> :
                            booksData ? booksData.filter((data) => data.quantity >= 1 && !data.isDeleted).map((data, index) => {
                                return (
                                    <Card key={index} sx={{ height: 350, width: 350, m: 3, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
                                        <CardActionArea>
                                            <Typography gutterBottom variant="h6" textAlign='center' >
                                                {data.title}
                                            </Typography>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                width="140"
                                                image={data.photo[0]}
                                                alt={data.title}
                                                onClick={(e) => navigate(`/single-book-view`, { state: { booksData, bookId: data._id } })}
                                            />
                                            <CardContent>

                                                <Typography variant="h7" color="text.secondary" fontWeight="bold" textAlign='center'>
                                                    Rent Now @ Price : {data.price} /hr
                                                </Typography>

                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button bookId={data._id} />
                                        </CardActions>
                                    </Card>
                                )
                            }) : "No Books to show"
                    }
                </div>
            </Box>
        </>
    )
}

export default KidsBooks