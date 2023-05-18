import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGOUT
} from '../../Constants/adminConstants'



export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return { loading: true }
        case ADMIN_LOGIN_SUCCESS:
            return { loading: false, adminLoginDetails: action.payload }
        case ADMIN_LOGIN_FAILURE:
            return { loading: false, error: action.payload }
        case ADMIN_LOGOUT:
            return { adminLoginDetails: false }
        default:
            return state
    }
}