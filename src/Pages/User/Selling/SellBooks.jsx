import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Box } from '@mui/material';
import { Alert } from '@mui/material';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer'
import NavBar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import { userSellBookAPI } from '../../../APIs/userAPI';
import { sellBook } from '../../../Redux/Actions/userActions/sellActions';
import { userGetAllGenreAction } from '../../../Redux/Actions/userActions/bookActions';


const SellBooks = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [publisher, setPublisher] = useState('')
    const [askPrice, setAskPrice] = useState('')
    const [damage, setDamage] = useState('')
    const [pages, setPages] = useState('')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [sucess, setSuccess] = useState(false)






    const onSubmit = async () => {

        setLoading(true)


        const formdata = new FormData()

        images.forEach((img) => {
            console.log(img)
            formdata.append("images", img)
        })


        const bookData = {
            title,
            author,
            genre,
            publisher,
            askPrice,
            pages,
            date,
            damage
        };

        for (const key in bookData) {
            formdata.append(key, bookData[key]);
        }


        userSellBookAPI(formdata).then((data) => {
            console.log(data.data, 'form data response');

            dispatch(sellBook(data.data))
            setLoading(false)

            setSuccess(true)

            setTimeout(() => {
                navigate("/sell-requests", { state: { bookAdded: true } })
                setSuccess(false)
            }, 3000)
        })
            .catch((error) => {
                console.log("some error", error);
                setLoading(false)
            })
    }

    useEffect(() => {
        dispatch(userGetAllGenreAction())
    }, [])

    const userGenres = useSelector(state => state.userGenreReducer)
    const { genreLoading, error, genreData } = userGenres

    return (
        <>
            <NavBar />
            <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: 10 }}>
                <div className="col-2">

                </div>
                <Card className='col-8 mx-auto'>

                    <div className="card flex flex-column md:flex-row gap-3">

                        <h1 className='text-center mt-2'>Sell Book with us</h1>
                        {loading || genreLoading ? (
                            <div className="loading-container text-center ">
                                <Loading />
                            </div>
                        ) : null}
                        {
                            sucess ? <Alert severity="success">Sell Request Sent !!!</Alert> : ''
                        }
                        <form id='addBookForm' onSubmit={handleSubmit(onSubmit)}>
                            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.title && "Enter a valid book title"}
                                    </p>
                                    <MDBInput id='form3Example1' label='Title of Book' type='text' {...register("title", { required: true })} onChange={(e) => setTitle(e.target.value)} />
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.author && "Enter a valid Author Name"}
                                    </p>
                                    <MDBInput id='form3Example2' label='Author of Book' type='text' {...register("author", { required: true })} onChange={(e) => setAuthor(e.target.value)} />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                                <MDBCol>

                                    <p style={{ color: 'red', margin: '0' }}>{errors.genre && "Select a valid Genre"}</p>
                                    <div className="form-group">
                                        <select
                                            {...register("genre", { required: true })}
                                            value={genre}
                                            onChange={(e) => setGenre(e.target.value)}
                                            id="genre"
                                            className="form-select"
                                        >
                                            <option value="" disabled>Select a Genre</option>
                                            {genreData &&
                                                genreData.data.filter(genre => !genre.isDeleted).map((genre) => (
                                                    <option key={genre._id} value={genre.name}>
                                                        {genre.name}
                                                    </option>
                                                ))}
                                        </select>
                                        {errors.genre && (
                                            <div className="text-danger">Select a valid Genre</div>
                                        )}
                                        {!genreData && <div>Loading genres...</div>}
                                        {genreData && !genreData.data.length && (
                                            <div className="text-danger">No genres found</div>
                                        )}
                                    </div>
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.publisher && "Enter a valid publisher name"}</p>
                                    <div className="form-outline">
                                        <MDBInput id='form3Example2' label='Publisher of Book' type='text' {...register("publisher", { required: true })} onChange={(e) => setPublisher(e.target.value)} />
                                    </div>
                                </MDBCol>
                            </MDBRow>


                            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.askPrice && "Enter a valid Asking Price"}
                                    </p>
                                    <MDBInput id='form3Example1' type='number' label='Asking price of Book' {...register("askPrice", { required: true, min: 1 })} onChange={(e) => setAskPrice(e.target.value)} />
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.pages && "Enter a valid pages"}
                                    </p>
                                    <MDBInput id='form3Example2' type='number' label='Pages of Book' {...register("pages", { required: true, min: 1 })} onChange={(e) => setPages(e.target.value)} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='pt-2 ms-4 me-4 mb-4'>
                                <p style={{ color: 'red', margin: '0' }}>{errors.damage && "Enter Damage Details if any"}
                                </p>
                                <MDBInput id='form3Example2' type='text' label='Specify is there any physical Damage?' {...register("damage", { required: true })} onChange={(e) => setDamage(e.target.value)} />
                            </MDBRow>

                            <MDBRow className='pt-2 ms-4 me-4 mb-4'>
                                <MDBInput id='form3Example2' type='date'  {...register("date", { required: true })} onChange={(e) => setDate(e.target.value)} />
                            </MDBRow>

                            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.image1 && "Enter a valid image "}
                                    </p>
                                    <label htmlFor="">Front Cover</label>
                                    <MDBInput id='form3Example1' type='file'  {...register("image1", { required: true, minLength: 1 })} onChange={(e) => setImages([...images, e.target.files[0]])} />
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.image2 && "Enter a valid image "}
                                    </p>
                                    <label htmlFor="">Back Cover</label>
                                    <MDBInput id='form3Example2' type='file' {...register("image2", { required: true, minLength: 1 })} onChange={(e) => setImages([...images, e.target.files[0]])} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                                <MDBCol>
                                    <label htmlFor="">Index Page</label>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.image3 && "Enter a valid image "}
                                    </p>
                                    <MDBInput id='form3Example1' type='file' {...register("image3", { required: true, minLength: 1 })} onChange={(e) => setImages([...images, e.target.files[0]])} />
                                </MDBCol>
                                <MDBCol>
                                    <label htmlFor="">Image4</label>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.image4 && "Enter a valid image "}
                                    </p>
                                    <MDBInput id='form3Example2' type='file'  {...register("image4", { required: true, minLength: 1 })} onChange={(e) => setImages([...images, e.target.files[0]])} />
                                </MDBCol>
                            </MDBRow>
                            <MDBContainer>
                                <Button type='submit' className='mb-4 container sm-3 mx-auto' style={{ backgroundColor: 'rgb(53, 91, 62)' }}>REQUEST SELL</Button>
                            </MDBContainer>
                        </form>
                    </div>
                </Card>
                <div className="col-2"></div>
            </Box>
            <Footer />
        </>
    )
}

export default SellBooks