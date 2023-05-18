import { ADMIN_GET_SALES_REPORT_FAILURE, ADMIN_GET_SALES_REPORT_REQUEST, ADMIN_GET_SALES_REPORT_SUCCESS } from "../../Constants/adminConstants"


export const getSalesReportDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_SALES_REPORT_REQUEST:
            return {
                loading: true
            }
        case ADMIN_GET_SALES_REPORT_SUCCESS:
            return {
                loading: false,
                salesReportData: action.payload
            }
        case ADMIN_GET_SALES_REPORT_FAILURE:
            return {
                loading: false,
                salesReportDataError: action.payload
            }
        default:
            return state
    }
}