import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
} from '../../Constants/userConstants'
import axios from 'axios'

const API = axios.create({ baseURL: "https://bookletterbackend.onrender.com" })


export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await API.post("/user-login", { email, password }, config);
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data
        })
        localStorage.setItem("user-login", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response && error.response.message ? error.response.message : error.response.data
        })
        console.log(error.response.data);
    }
}

export const userOtpLoginAction = (phone) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await API.post("/otp-login", { phone }, config);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("user-login", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response && error.response.message ? error.response.message : error.response.data
        })
        console.log(error.response.data);
    }
}

export const userLogout = () => async (dispatch) => {
    try {
        localStorage.removeItem("user-login")
        dispatch({ type: USER_LOGOUT });
    } catch (error) {
        console.log(error);
    }
}


