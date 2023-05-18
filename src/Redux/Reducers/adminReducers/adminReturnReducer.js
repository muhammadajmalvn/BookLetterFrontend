import { ADMIN_GET_ALL_RETURN_REQUEST, ADMIN_GET_ALL_RETURN_SUCCESS, ADMIN_GET_ALL_RETURN_FAILURE, ADMIN_ACCEPT_RETURN_REQUEST, ADMIN_ACCEPT_RETURN_SUCCESS, ADMIN_ACCEPT_RETURN_FAILURE } from '../../Constants/adminConstants'

export const adminGetReturnReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_ALL_RETURN_REQUEST:
            return { loading: true }
        case ADMIN_GET_ALL_RETURN_SUCCESS:
            return { loading: false, adminReturnData: action.payload }
        case ADMIN_GET_ALL_RETURN_FAILURE:
            return { loading: false, error: action.payload }
        case ADMIN_ACCEPT_RETURN_REQUEST:
            return { loading: true }
        case ADMIN_ACCEPT_RETURN_SUCCESS:
            return { loading: false, adminReturnData: action.payload }
        case ADMIN_ACCEPT_RETURN_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}