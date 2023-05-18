import { adminGetAllSellRequest } from "../../../APIs/adminAPI"
import { ADMIN_GET_SELL_BOOKS_FAILURE, ADMIN_GET_SELL_BOOKS_REQUEST, ADMIN_GET_SELL_BOOKS_SUCCESS } from "../../Constants/adminConstants"




export const adminGetAllSellAction = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_GET_SELL_BOOKS_REQUEST
        })
        adminGetAllSellRequest().then((data) => {
            dispatch({
                type: ADMIN_GET_SELL_BOOKS_SUCCESS,
                payload: data.data
            })
        })
    } catch (error) {
        dispatch({
            type: ADMIN_GET_SELL_BOOKS_FAILURE,
            payload: error.response.message
        })
    }
}