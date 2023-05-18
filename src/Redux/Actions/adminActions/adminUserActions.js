import {
    ADMIN_USERS_FETCH_REQUEST, ADMIN_USERS_FETCH_SUCCESS, ADMIN_USERS_FETCH_FAILURE,
    ADMIN_USER_BLOCK_REQUEST, ADMIN_USER_BLOCK_SUCCESS, ADMIN_USER_BLOCK_FAILURE,
    ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DELETE_FAILURE,
    ADMIN_SEARCH_REQUEST, ADMIN_SEARCH_SUCCESS, ADMIN_SEARCH_FAILURE,
} from '../../Constants/adminConstants'
import { adminGetUsersAPI, adminUserBlockUnblockAPI, adminDeleteUserAPI, adminSearchAPI } from '../../../APIs/adminAPI';


export const userDetailsFetch = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USERS_FETCH_REQUEST })
        adminGetUsersAPI().then((data) => {
            dispatch({
                type: ADMIN_USERS_FETCH_SUCCESS, payload: data
            })
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USERS_FETCH_FAILURE,
            payload: error.response.data
        })
    }
}


export const userBlockUnblock = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USER_BLOCK_REQUEST })
        adminUserBlockUnblockAPI(id).then((data) => {
            dispatch({
                type: ADMIN_USER_BLOCK_SUCCESS, payload: data
            })
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_BLOCK_FAILURE,
            payload: error.response.message
        })
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USER_DELETE_REQUEST })

        adminDeleteUserAPI(id).then((data) => {
            dispatch({
                type: ADMIN_USER_DELETE_SUCCESS, payload: data
            })
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_DELETE_FAILURE,
            payload: error.response.message
        })
    }
}



export const adminSearch = (searchkeyword) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SEARCH_REQUEST })
        adminSearchAPI(searchkeyword).then((data) => {
            dispatch({ type: ADMIN_SEARCH_SUCCESS, payload: data })
        })
    } catch (error) {
        dispatch({
            type: ADMIN_SEARCH_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response.data,
        });
    }
}

