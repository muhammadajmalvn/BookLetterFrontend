import {USER_GET_SELL_BOOKS_REQUEST,USER_GET_SELL_BOOKS_SUCCESS,USER_GET_SELL_BOOKS_FAILURE} from '../../Constants/userConstants'

export const userGetSellBooksReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_SELL_BOOKS_REQUEST:
            return { loading: true }
        case USER_GET_SELL_BOOKS_SUCCESS:
            return { loading: false, sellBooks: action.payload }
        case USER_GET_SELL_BOOKS_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}