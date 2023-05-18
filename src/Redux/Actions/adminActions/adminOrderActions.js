import { adminGetOrdersAPI } from '../../../APIs/adminAPI'
import { ADMIN_GET_ALL_ORDERS_REQUEST, ADMIN_GET_ALL_ORDERS_SUCCESS, ADMIN_GET_ALL_ORDERS_FAILURE } from '../../Constants/adminConstants'


export const adminGetAllOrdersAction = () => async (dispatch) => {
    dispatch({ type: ADMIN_GET_ALL_ORDERS_REQUEST })
    try {
        adminGetOrdersAPI().then((data) => {
            dispatch({
                type: ADMIN_GET_ALL_ORDERS_SUCCESS, payload: data.data
            })
        })
    }
    catch {
        dispatch({
            type: ADMIN_GET_ALL_ORDERS_FAILURE, payload: error.response.data
        })
    }
}
