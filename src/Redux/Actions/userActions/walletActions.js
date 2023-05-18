import { userGetWalletAPI } from "../../../APIs/userAPI"
import { USER_GET_WALLET_FAILURE, USER_GET_WALLET_REQUEST, USER_GET_WALLET_SUCCESS } from "../../Constants/userConstants"




export const userGetWalletAction = () => async (dispatch) => {
  dispatch({
    type: USER_GET_WALLET_REQUEST
  })

  userGetWalletAPI().then((data) => {
    dispatch({
      type: USER_GET_WALLET_SUCCESS,
      payload: data.data
    })
  })
    .catch((error) => {
      dispatch({
        type: USER_GET_WALLET_FAILURE,
        payload: error.response.data
      })
    })
}