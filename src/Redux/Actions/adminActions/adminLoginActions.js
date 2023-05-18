
import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGOUT
} from '../../Constants/adminConstants'

import axios from 'axios'

const API = axios.create({ baseURL: "https://bookletterbackend.onrender.com/admin" })


export const adminLogin = (email, password) => async (dispatch) => {
    console.log(email, password, 'inside actionsssss');
    try {
        dispatch({ type: ADMIN_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await API.post("/", { email, password }, config);
        dispatch({
            type: ADMIN_LOGIN_SUCCESS, payload: data
        })
        localStorage.setItem("adminInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAILURE,
            payload: error.response.data
        })
    }
}


export const adminLogout = () => async (dispatch) => {
    try {
        localStorage.removeItem("adminInfo")
        dispatch({ type: ADMIN_LOGOUT });
    } catch (error) {
        console.log(error);
    }
}
