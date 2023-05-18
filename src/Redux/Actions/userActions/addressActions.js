import { userAddAddressAPI, userGetAddressesAPI } from '../../../APIs/userAPI'
import { USER_FETCH_ADDRESSES_REQUEST, USER_FETCH_ADDRESSES_SUCCESS, USER_FETCH_ADDRESSES_FAILURE, USER_ADD_ADDRESS_REQUEST, USER_ADD_ADDRESS_SUCCESS, USER_ADD_ADDRESS_FAILURE } from '../../Constants/userConstants'

export const addAddress = (address) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ADD_ADDRESS_REQUEST
        })
        userAddAddressAPI(address).then((data) => {
            dispatch({
                type: USER_ADD_ADDRESS_SUCCESS,
                payload: data.data
            })
        }).catch((error) => {
            dispatch({
                type: USER_ADD_ADDRESS_FAILURE,
                payload: error.response.message
            })
        })
    } catch (error) {
        console.log('dispatch request failed: ' + error);
    }
}

export const getAddressAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_FETCH_ADDRESSES_REQUEST
        })
        userGetAddressesAPI().then((data) => {
            dispatch({
                type: USER_FETCH_ADDRESSES_SUCCESS,
                payload: data.data
            })
        }).catch((error) => {
            dispatch({
                type: USER_FETCH_ADDRESSES_FAILURE,
                payload: error.response.message
            })
        })
    } catch (error) {
        console.log('dispatch request failed: ' + error);
    }
}
