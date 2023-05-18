import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Box } from '@mui/material';
import { Alert } from '@mui/material';
import { useForm } from 'react-hook-form'
import Loading from '../../../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../../../../Redux/Actions/adminActions/adminBookActions';
import { adminGetAllGenreAction } from '../../../../Redux/Actions/adminActions/adminGenreActions';
import { adminAddBookAPI } from '../../../../APIs/adminAPI';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [publisher, setPublisher] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
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


        formdata.append("title", title)
        formdata.append("author", author)
        formdata.append("genre", genre)
        formdata.append("publisher", publisher)
        formdata.append("price", price)
        formdata.append("pages", pages)
        formdata.append("date", date)
        formdata.append("description", description)


        adminAddBookAPI(formdata).then((data) => {
            console.log(data.data, 'form data response');

            dispatch(addBook(data.data))
            setLoading(false)

            setSuccess(true)

            setTimeout(() => {
                navigate("/admin/books", { state: { bookAdded: true } })
                setSuccess(false)
            }, 3000)
        })
            .catch((error) => {
                console.log("some error", error);
                setLoading(false)
            })
    }

    const adminGenres = useSelector(state => state.adminGenreReducer)
    const { genreLoading, error, genreData } = adminGenres
    useEffect(() => {
        dispatch(adminGetAllGenreAction())
    }, [])
    return (
        <>
            <Sidebar />
            <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: 10 }}>
                <div className="col-2">

                </div>
                <Card className='col-8 mx-auto'>

                    <div className="card flex flex-column md:flex-row gap-3">

                        <h1 className='text-center mt-2'>Add Book</h1>
                        {loading ? (
                            <div className="loading-container text-center ">
                                <Loading />
                            </div>
                        ) : null}
                        {
                            sucess ? <Alert severity="success">Book Added !!!</Alert> : ''
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
                                    <p style={{ color: 'red', margin: '0' }}>{errors.price && "Enter a valid price"}
                                    </p>
                                    <MDBInput id='form3Example1' type='number' label='Price of Book' {...register("price", { required: true, min: 1 })} onChange={(e) => setPrice(e.target.value)} />
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.pages && "Enter a valid pages"}
                                    </p>
                                    <MDBInput id='form3Example2' type='number' label='Pages of Book' {...register("pages", { required: true, min: 1 })} onChange={(e) => setPages(e.target.value)} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='pt-2 ms-4 me-4 mb-4'>
                                <p style={{ color: 'red', margin: '0' }}>{errors.description && "Enter a valid description"}
                                </p>
                                <MDBInput id='form3Example2' type='text' label='Description of Book' {...register("description", { required: true })} onChange={(e) => setDescription(e.target.value)} />
                            </MDBRow>

                            <MDBRow className='pt-2 ms-4 me-4 mb-4'>
                                <MDBInput id='form3Example2' type='date'  {...register("date", { required: true })} onChange={(e) => setDate(e.target.value)} />
                            </MDBRow>

                            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.image1 && "Enter a valid image "}
                                    </p>
                                    <label htmlFor="">Image1</label>
                                    <MDBInput id='form3Example1' type='file'  {...register("image1", { required: true, minLength: 1 })} onChange={(e) => setImages([...images, e.target.files[0]])} />
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ color: 'red', margin: '0' }}>{errors.image2 && "Enter a valid image "}
                                    </p>
                                    <label htmlFor="">Image2</label>
                                    <MDBInput id='form3Example2' type='file' {...register("image2", { required: true, minLength: 1 })} onChange={(e) => setImages([...images, e.target.files[0]])} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='pt-2 ms-3 me-3 mb-4'>
                                <MDBCol>
                                    <label htmlFor="">Image3</label>
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
                                <Button type='submit' className='mb-4 container sm-3 mx-auto' style={{ backgroundColor: 'rgb(53, 91, 62)' }}>ADD</Button>
                            </MDBContainer>
                        </form>
                    </div>
                </Card>
                <div className="col-2"></div>
            </Box>

        </>
    )
}
export default AddBook