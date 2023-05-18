import { ADMIN_GET_SELL_BOOKS_FAILURE, ADMIN_GET_SELL_BOOKS_REQUEST, ADMIN_GET_SELL_BOOKS_SUCCESS } from '../../Constants/adminConstants'

export const adminGetSellBooksReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_SELL_BOOKS_REQUEST:
            return { loading: true }
        case ADMIN_GET_SELL_BOOKS_SUCCESS:
            return { loading: false, adminSellBooks: action.payload }
        case ADMIN_GET_SELL_BOOKS_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}