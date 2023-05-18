import { ADMIN_GET_DASHBOARD_DETAILS_FAILURE, ADMIN_GET_DASHBOARD_DETAILS_REQUEST, ADMIN_GET_DASHBOARD_DETAILS_SUCCESS } from "../../Constants/adminConstants"


export const getDashboardDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_DASHBOARD_DETAILS_REQUEST:
            return {
                loading: true
            }
        case ADMIN_GET_DASHBOARD_DETAILS_SUCCESS:
            return {
                loading: false,
                dashBoardData: action.payload
            }
        case ADMIN_GET_DASHBOARD_DETAILS_FAILURE:
            return {
                loading: false,
                dashBoardDataError: action.payload
            }
        default:
            return state
    }
}