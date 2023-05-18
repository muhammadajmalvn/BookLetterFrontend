import {
    ADMIN_GET_ALL_ORDERS_REQUEST,
    ADMIN_GET_ALL_ORDERS_SUCCESS,
    ADMIN_GET_ALL_ORDERS_FAILURE
} from '../../Constants/adminConstants'


export const adminGetOrdersReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_ALL_ORDERS_REQUEST:
            return { loading: true }
        case ADMIN_GET_ALL_ORDERS_SUCCESS:
            return { loading: false, adminOrderData: action.payload }
        case ADMIN_GET_ALL_ORDERS_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}