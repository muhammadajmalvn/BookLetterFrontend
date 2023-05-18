import { getSalesReportAPI } from "../../../APIs/adminAPI";
import { ADMIN_GET_SALES_REPORT_FAILURE, ADMIN_GET_SALES_REPORT_REQUEST, ADMIN_GET_SALES_REPORT_SUCCESS } from "../../Constants/adminConstants"


export const getSalesReportDataAction = () => async (dispatch) => {
    dispatch({ type: ADMIN_GET_SALES_REPORT_REQUEST })
    try {
        getSalesReportAPI().then((data) => {
            dispatch({ type: ADMIN_GET_SALES_REPORT_SUCCESS, payload: data.data });
        })
    } catch (error) {
        dispatch({ type: ADMIN_GET_SALES_REPORT_FAILURE, payload: error.response });
    }
}