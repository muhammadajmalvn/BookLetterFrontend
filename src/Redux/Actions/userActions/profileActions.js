import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE,

    UPLOAD_USER_IMAGE_REQUEST,
    UPLOAD_USER_IMAGE_SUCCESS,
    UPLOAD_USER_IMAGE_FAILURE
} from '../../Constants/userConstants'

import axios from 'axios'

const API = axios.create({ baseURL: "https://bookletterbackend.onrender.com" })


export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_PROFILE_REQUEST });
        const user = JSON.parse(localStorage.getItem('user-login'))
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token
            }
        }

        await API.get('/profile/?id=' + user.id, config).then((data) => {
            dispatch({
                type: GET_USER_PROFILE_SUCCESS, payload: data
            })
        })
            .catch((error) => {
                dispatch({
                    type: GET_USER_PROFILE_FAILURE,
                    payload: error.response && error.response.message ? error.response.message : error.response.data
                })
                console.log(error.response.data);
            })
    }
    catch (error) {
        console.log(error);
    }
}

export const userImageAction = (image) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_USER_IMAGE_REQUEST });
        const user = JSON.parse(localStorage.getItem('user-login'))
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token
            }
        }
        await API.post('/profileImageUpdate?id=' + user.id, { image }, config).then((data) => {
            dispatch({ type: UPLOAD_USER_IMAGE_SUCCESS, payload: data });
        })
            .catch((error) => {
                dispatch({
                    type: UPLOAD_USER_IMAGE_FAILURE, payload: error.response && error.response.message ? error.response.message : error.response.data
                });
                console.log(error.response.data);
            });
    }
    catch (error) {
        console.log(error);
    }
}