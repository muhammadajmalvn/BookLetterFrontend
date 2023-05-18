import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE,

    UPLOAD_USER_IMAGE_REQUEST,
    UPLOAD_USER_IMAGE_SUCCESS,
    UPLOAD_USER_IMAGE_FAILURE
} from '../../Constants/userConstants'


export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_REQUEST:
            return { loading: true }
        case GET_USER_PROFILE_SUCCESS:
            return { loading: false, profileData: action.payload }
        case GET_USER_PROFILE_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userImageReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_USER_IMAGE_REQUEST:
            return { loading: true }
        case UPLOAD_USER_IMAGE_SUCCESS:
            return { loading: false, profilePicture: action.payload }
        case UPLOAD_USER_IMAGE_FAILURE:
            return { loading: false, ImageError: action.payload }
        default:
            return state
    }
}