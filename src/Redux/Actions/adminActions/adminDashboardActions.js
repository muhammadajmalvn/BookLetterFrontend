import { adminGetDashboardDetailsAPI } from "../../../APIs/adminAPI"
import { ADMIN_GET_DASHBOARD_DETAILS_FAILURE, ADMIN_GET_DASHBOARD_DETAILS_REQUEST, ADMIN_GET_DASHBOARD_DETAILS_SUCCESS } from "../../Constants/adminConstants"




export const getDashboardDetailsAction = (id) => async (dispatch) => {
    dispatch({ type: ADMIN_GET_DASHBOARD_DETAILS_REQUEST })
    try {
        adminGetDashboardDetailsAPI(id).then((data) => {
            dispatch({
                type: ADMIN_GET_DASHBOARD_DETAILS_SUCCESS, payload: data.data
            })
        })
    }
    catch (error) {
        dispatch({
            type: ADMIN_GET_DASHBOARD_DETAILS_FAILURE, payload: error.response.data
        })
    }

}

