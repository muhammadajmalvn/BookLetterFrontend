import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILURE,
} from '../../Constants/userConstants'

import axios from 'axios'

const API = axios.create({ baseURL: "https://bookletterbackend.onrender.com" })

export const userSignup = (firstName, lastName, email, phone, password) => async (dispatch) => {
    console.log(firstName, lastName, email, phone, password, 'inside userActionsssssssssssssssssss');
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const { data } = await API.post("/user-signup", { firstName, lastName, email, phone, password }, config);
        dispatch({
            type: USER_SIGNUP_SUCCESS, payload: data

        })
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAILURE,
            payload: error.response && error.response.message ?
                error.response.message : error.response.data
        })
        console.log(error.response.data);
    }
}