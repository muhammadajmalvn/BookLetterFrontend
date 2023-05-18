import { USER_GET_WALLET_FAILURE, USER_GET_WALLET_REQUEST, USER_GET_WALLET_SUCCESS } from "../../Constants/userConstants"

export const userGetWalletReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_WALLET_REQUEST:
            return {
                walletLoading: true
            }
        case USER_GET_WALLET_SUCCESS:
            return {
                walletLoading: false,
                walletData: action.payload
            }
        case USER_GET_WALLET_FAILURE:
            return {
                walletLoading: false,
                walletDataError: action.payload
            }
        default:
            return state
    }
}