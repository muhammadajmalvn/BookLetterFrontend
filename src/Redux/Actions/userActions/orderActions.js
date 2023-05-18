import {
    USER_GET_ORDERED_BOOKS_REQUEST,
    USER_GET_ORDERED_BOOKS_SUCCESS,
    USER_GET_ORDERED_BOOKS_FAILURE,
    USER_ORDER_RETURN_REQUEST,
    USER_ORDER_RETURN_SUCCESS,
    USER_ORDER_RETURN_FAILURE,
    USER_BOOK_ORDER_REQUEST,
    USER_BOOK_ORDER_SUCCESS,
    USER_BOOK_ORDER_FAILURE
} from '../../Constants/userConstants'
import { userOrderAPI } from '../../../APIs/userAPI'
import axios from 'axios'

const API = axios.create({ baseURL: "https://bookletterbackend.onrender.com" })


export const getOrderedBooksAction = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_ORDERED_BOOKS_REQUEST
        })
        const user = JSON.parse(localStorage.getItem('user-login'))
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token
            }
        }
        const { data } = await API.get('/orders?id=' + userId, config)
        dispatch({
            type: USER_GET_ORDERED_BOOKS_SUCCESS,
            payload: data
        })
            .catch((error) => {
                dispatch({
                    type: USER_GET_ORDERED_BOOKS_FAILURE,
                    payload: error.response.message
                })
            })
    } catch (error) {

    }
}


export const userOrderReturnAction = (orderId, trackingId) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ORDER_RETURN_REQUEST
        })
        const user = JSON.parse(localStorage.getItem('user-login'))
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token
            }
        }
        const { data } = await API.post('/return?id=' + orderId, { trackingId }, config)
        dispatch({
            type: USER_ORDER_RETURN_SUCCESS,
            payload: data
        })
            .catch((error) => {
                dispatch({
                    type: USER_ORDER_RETURN_FAILURE,
                    payload: error.response.message
                })
            })
    } catch (error) {

    }
}

export const userOrderBookAction = (bookingData) => async (dispatch) => {
    dispatch({
        type: USER_BOOK_ORDER_REQUEST
    })

    userOrderAPI(bookingData).then((data) => {

        if (data.data.url) {
            window.location.href = data.data.url
        } else {
            dispatch({
                type: USER_BOOK_ORDER_SUCCESS,
                payload: data.data?.message
            })
        }
    })
        .catch((error) => {
            dispatch({
                type: USER_BOOK_ORDER_FAILURE,
                payload: error.response.data.message
            })
        })
}