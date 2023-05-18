import {
    USER_GET_BOOKS_REQUEST,
    USER_GET_BOOKS_SUCCESS,
    USER_GET_BOOKS_FAILURE,
    USER_GET_GENRE_BOOKS_REQUEST,
    USER_GET_GENRE_BOOKS_FAILURE,
    USER_GET_GENRE_BOOKS_SUCCESS,
    USER_BOOK_SEARCH_FAILURE,
    USER_BOOK_SEARCH_SUCCESS,
    USER_BOOK_SEARCH_REQUEST,
    USER_GENRES_FETCH_REQUEST,
    USER_GENRES_FETCH_SUCCESS,
    USER_GENRES_FETCH_FAILURE
} from '../../Constants/userConstants'

import { userBookSearchAPI, userGetBooksAPI, userGetGenreBooksAPI, userGetGenresAPI } from '../../../APIs/userAPI'



export const userGetBooksAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_BOOKS_REQUEST
        })
        userGetBooksAPI().then((data) => {
            dispatch({
                type: USER_GET_BOOKS_SUCCESS,
                payload: data.data
            })
        }).catch((error) => {
            dispatch({
                type: USER_GET_BOOKS_FAILURE,
                payload: error.response.message
            })
        })

    } catch (error) {

    }
}




export const userGetGenreBooksAction = (genre) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_GENRE_BOOKS_REQUEST
        })
        userGetGenreBooksAPI(genre).then((data) => {
            dispatch({
                type: USER_GET_GENRE_BOOKS_SUCCESS,
                payload: data.data
            })
        })
            .catch((error) => {
                dispatch({
                    type: USER_GET_GENRE_BOOKS_FAILURE,
                    payload: error.response.message
                })
            })
    } catch (error) {

    }
}


export const userBookSearchAction = (searchTerm) => async (dispatch) => {
    try {
        dispatch({ type: USER_BOOK_SEARCH_REQUEST })
        userBookSearchAPI(searchTerm).then((data) => {
            dispatch({ type: USER_BOOK_SEARCH_SUCCESS, payload: data.data })
        })
    } catch (error) {
        dispatch({
            type: USER_BOOK_SEARCH_FAILURE,
            payload:
                error.response && error.response.message
                    ? error.response.message
                    : error.response,

        });
        console.log(error);

    }
}


export const userGetAllGenreAction = () => async (dispatch) => {
    dispatch({ type: USER_GENRES_FETCH_REQUEST })
    try {
        userGetGenresAPI().then((data) => {
            dispatch({
                type: USER_GENRES_FETCH_SUCCESS, payload: data
            })
        })
    }
    catch {
        dispatch({
            type: USER_GENRES_FETCH_FAILURE, payload: error.response.data
        })
    }
}