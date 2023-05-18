import { adminAddGenreAPI, adminDeleteGenresAPI, adminGetGenresAPI } from '../../../APIs/adminAPI'
import { ADMIN_ADD_GENRE_REQUEST, ADMIN_ADD_GENRE_SUCCESS, ADMIN_ADD_GENRE_FAILURE ,ADMIN_GENRES_FETCH_SUCCESS,ADMIN_GENRES_FETCH_REQUEST,ADMIN_GENRES_FETCH_FAILURE, ADMIN_GENRES_DELETE_REQUEST, ADMIN_GENRES_DELETE_SUCCESS, ADMIN_GENRES_DELETE_FAILURE} from '../../Constants/adminConstants'


export const adminAddGenreAction = (genre) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ADD_GENRE_REQUEST })
        adminAddGenreAPI(genre).then((data) => {
            dispatch({
                type: ADMIN_ADD_GENRE_SUCCESS, payload: data
            })
        })
            .catch((error) => {
                if (error.response.status === 500) {
                    dispatch({
                        type: ADMIN_ADD_GENRE_FAILURE,
                        payload: error.response && error.response.message ?
                            error.response.message : error.response.data
                    })
                } else {
                    // handle other errors here
                }
            })
    } catch (error) {
        dispatch({
            type: ADMIN_ADD_GENRE_FAILURE,
            payload: error.response && error.response.message ?
                error.response.message : error.response.data
        })
        console.log(error.response.data);
    }
}


export const adminGetAllGenreAction = () => async (dispatch) => {
    dispatch({ type: ADMIN_GENRES_FETCH_REQUEST })
    try {
        adminGetGenresAPI().then((data) => {
            dispatch({
                type: ADMIN_GENRES_FETCH_SUCCESS, payload: data
            })
        })
    }
    catch {
        dispatch({
            type: ADMIN_GENRES_FETCH_FAILURE, payload: error.response.data
        })
    }
}


export const deleteGenre = (id) => async (dispatch) => {
    dispatch({ type: ADMIN_GENRES_DELETE_REQUEST })
    try {
        adminDeleteGenresAPI(id).then((data) => {
            dispatch({
                type: ADMIN_GENRES_DELETE_SUCCESS, payload: data
            })
        })
    }
    catch {
        dispatch({
            type: ADMIN_GENRES_DELETE_FAILURE, payload: error.response.data
        })
    }
}