import { userGetSellRequestsAPI, userSendSellBookAPI } from '../../../APIs/userAPI'
import { USER_GET_SELL_BOOKS_FAILURE, USER_GET_SELL_BOOKS_REQUEST, USER_GET_SELL_BOOKS_SUCCESS, USER_SEND_SELLED_BOOK_FAILURE, USER_SEND_SELLED_BOOK_REQUEST, USER_SEND_SELLED_BOOK_SUCCESS } from '../../Constants/userConstants'
import { USER_BOOK_SELL_REQUEST_SUCCESS } from '../../Constants/userConstants'


export const sellBook = (data) => async (dispatch) => {

    dispatch({
        type: USER_BOOK_SELL_REQUEST_SUCCESS, payload: data
    })

}

export const getsellRequestedBooksAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_SELL_BOOKS_REQUEST
        })
        userGetSellRequestsAPI().then((data) => {
            dispatch({
                type: USER_GET_SELL_BOOKS_SUCCESS,
                payload: data.data
            })
        })
    } catch (error) {
        dispatch({
            type: USER_GET_SELL_BOOKS_FAILURE,
            payload: error.response.message
        })
    }
}

export const userSendSelledBookAction = (orderId, trackingId) => async (dispatch) => {
    try {
        dispatch({ type: USER_SEND_SELLED_BOOK_REQUEST })
        userSendSellBookAPI(orderId, trackingId).then((data) => {
            dispatch({ type: USER_SEND_SELLED_BOOK_SUCCESS, payload: data.data })
        })
            .catch((err) => {
                dispatch({ type: USER_SEND_SELLED_BOOK_FAILURE, payload: err.response })
            })
    } catch (error) {
        console.log('error in userSendSelledBookAction', error);
    }
}