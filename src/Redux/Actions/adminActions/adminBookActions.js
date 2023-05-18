import {
    ADMIN_BOOK_ADD_SUCCESS,
    ADMIN_BOOK_FETCH_REQUEST, ADMIN_BOOK_FETCH_SUCCESS, ADMIN_BOOK_FETCH_FAILURE,
    ADMIN_BOOK_DELETE_REQUEST, ADMIN_BOOK_DELETE_SUCCESS, ADMIN_BOOK_DELETE_FAILURE,
    ADMIN_GET_LOCATION_REQUEST, ADMIN_GET_LOCATION_SUCCESS, ADMIN_GET_LOCATION_FAILURE
} from '../../Constants/adminConstants'
import { adminGetBooksAPI, adminDeleteBookAPI } from '../../../APIs/adminAPI'

import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:5000/admin" })


export const addBook = (data) => async (dispatch) => {

    dispatch({
        type: ADMIN_BOOK_ADD_SUCCESS, payload: data
    })

}

export const adminGetAllBookAction = () => async (dispatch) => {
    dispatch({ type: ADMIN_BOOK_FETCH_REQUEST })
    try {
        adminGetBooksAPI().then((data) => {
            dispatch({
                type: ADMIN_BOOK_FETCH_SUCCESS, payload: data
            })
        })
    }
    catch {
        dispatch({
            type: ADMIN_BOOK_FETCH_FAILURE, payload: error.response.data
        })
    }

}


export const adminDeleteBookAction = (id) => async (dispatch) => {
    dispatch({ type: ADMIN_BOOK_DELETE_REQUEST })
    try {
        adminDeleteBookAPI(id).then((data) => {
            dispatch({
                type: ADMIN_BOOK_DELETE_SUCCESS, payload: data
            })
        })
    }
    catch {
        dispatch({
            type: ADMIN_BOOK_DELETE_FAILURE, payload: error.response.data
        })
    }

}


export const adminGetLocation = () => async (dispatch) => {
    dispatch({
        type: ADMIN_GET_LOCATION_REQUEST,
    })
    try {
        getLocationAPI().then((data) => {
            dispatch({
                type: ADMIN_GET_LOCATION_SUCCESS,
                payload: data.data
            })
        })

    } catch {
        dispatch({
            type: ADMIN_GET_LOCATION_FAILURE,
            payload: error.response.message
        })
    }
}