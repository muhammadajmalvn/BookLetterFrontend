import { ADMIN_GET_ALL_RETURN_REQUEST, ADMIN_GET_ALL_RETURN_SUCCESS, ADMIN_GET_ALL_RETURN_FAILURE,ADMIN_ACCEPT_RETURN_REQUEST,ADMIN_ACCEPT_RETURN_SUCCESS,ADMIN_ACCEPT_RETURN_FAILURE } from '../../Constants/adminConstants'
import { adminAcceptReturnAPI, adminGetRetunAPI } from '../../../APIs/adminAPI'

export const adminGetReturnRequests = () => async (dispatch) => {
    dispatch({ type: ADMIN_GET_ALL_RETURN_REQUEST })
    try {
        adminGetRetunAPI().then((data) => {
            dispatch({ type: ADMIN_GET_ALL_RETURN_SUCCESS, payload: data.data })
        })
    }
    catch {
        dispatch({ type: ADMIN_GET_ALL_RETURN_FAILURE, payload: error.response.data })
    }
}
export const adminAcceptBookAction =(id,orderId,bookId,copyId)=>async(dispatch)=>{
    dispatch({type:ADMIN_ACCEPT_RETURN_REQUEST})
    try {
        adminAcceptReturnAPI(id,orderId,bookId,copyId).then((data)=>{
            dispatch({type:ADMIN_ACCEPT_RETURN_SUCCESS,payload:data.data})
        })
    } catch  {
        dispatch({type:ADMIN_ACCEPT_RETURN_FAILURE,payload:error.response.data})
    }
}