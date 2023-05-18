import { USER_FETCH_ADDRESSES_REQUEST, USER_FETCH_ADDRESSES_SUCCESS, USER_FETCH_ADDRESSES_FAILURE, USER_ADD_ADDRESS_REQUEST, USER_ADD_ADDRESS_SUCCESS, USER_ADD_ADDRESS_FAILURE } from '../../Constants/userConstants'

export const userAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_ADDRESS_REQUEST:
            return { loading: true }

        case USER_ADD_ADDRESS_SUCCESS:
            return { loading: false, addresses: action.payload }

        case USER_ADD_ADDRESS_FAILURE:
            return { loading: false, error: action.payload }

        case USER_FETCH_ADDRESSES_REQUEST:
            return { loading: true }

        case USER_FETCH_ADDRESSES_SUCCESS:
            return { loading: false, addresses: action.payload }

        case USER_FETCH_ADDRESSES_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
