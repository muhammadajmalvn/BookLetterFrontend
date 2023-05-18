import {
    ADMIN_USERS_FETCH_REQUEST,
    ADMIN_USERS_FETCH_SUCCESS,
    ADMIN_USERS_FETCH_FAILURE,

    ADMIN_USER_BLOCK_REQUEST,
    ADMIN_USER_BLOCK_SUCCESS,
    ADMIN_USER_BLOCK_FAILURE,

    ADMIN_USER_DELETE_REQUEST,
    ADMIN_USER_DELETE_SUCCESS,
    ADMIN_USER_DELETE_FAILURE,

    ADMIN_BOOK_FETCH_REQUEST,
    ADMIN_BOOK_FETCH_SUCCESS,
    ADMIN_BOOK_FETCH_FAILURE,

    ADMIN_BOOK_DELETE_REQUEST,
    ADMIN_BOOK_DELETE_SUCCESS,
    ADMIN_BOOK_DELETE_FAILURE,

    ADMIN_GET_LOCATION_REQUEST,
    ADMIN_GET_LOCATION_SUCCESS,
    ADMIN_GET_LOCATION_FAILURE,

    ADMIN_SEARCH_REQUEST,
    ADMIN_SEARCH_SUCCESS,
    ADMIN_SEARCH_FAILURE,

    ADMIN_ADD_GENRE_REQUEST,
    ADMIN_ADD_GENRE_SUCCESS,
    ADMIN_ADD_GENRE_FAILURE,

    ADMIN_GENRES_FETCH_REQUEST,
    ADMIN_GENRES_FETCH_SUCCESS,
    ADMIN_GENRES_FETCH_FAILURE,
    
    ADMIN_GENRES_DELETE_REQUEST,
    ADMIN_GENRES_DELETE_SUCCESS,
    ADMIN_GENRES_DELETE_FAILURE
} from '../../Constants/adminConstants'



export const adminControlReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_USERS_FETCH_REQUEST:
            return { loading: true }
        case ADMIN_USERS_FETCH_SUCCESS:
            return { loading: false, adminUserData: action.payload }
        case ADMIN_USERS_FETCH_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const blockUserReducer = (state = {}, action) => {
    console.log(action, 'output from server inside reducer');
    switch (action.type) {
        case ADMIN_USER_BLOCK_REQUEST:
            return { loading: true }
        case ADMIN_USER_BLOCK_SUCCESS:
            return { loading: false, adminUserData: action.payload }
        case ADMIN_USER_BLOCK_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_USER_DELETE_REQUEST:
            return { loading: true }
        case ADMIN_USER_DELETE_SUCCESS:
            return { loading: false, adminUserData: action.payload }
        case ADMIN_USER_DELETE_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const getBookReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_BOOK_FETCH_REQUEST:
            return { loading: true }
        case ADMIN_BOOK_FETCH_SUCCESS:
            return { loading: false, adminBookData: action.payload }
        case ADMIN_BOOK_FETCH_FAILURE:
            return { loading: false, error: action.payload }
        case ADMIN_BOOK_DELETE_REQUEST:
            return { loading: true }
        case ADMIN_BOOK_DELETE_SUCCESS:
            return { loading: false, adminBookData: action.payload }
        case ADMIN_BOOK_DELETE_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const deleteBookReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_BOOK_DELETE_REQUEST:
            return { loading: true }
        case ADMIN_BOOK_DELETE_SUCCESS:
            return { loading: false, adminBookData: action.payload }
        case ADMIN_BOOK_DELETE_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getLocationReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_LOCATION_REQUEST:
            return { loading: true }
        case ADMIN_GET_LOCATION_SUCCESS:
            return { loading: false, location: action.payload }
        case ADMIN_GET_LOCATION_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const adminSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_SEARCH_REQUEST:
            return { searchloading: true }

        case ADMIN_SEARCH_SUCCESS:
            return { searchloading: false, searchresult: action.payload }

        case ADMIN_SEARCH_FAILURE:
            return { loading: false, searcherror: action.payload }
        default:
            return state;
    }
}


export const adminGenreAddReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ADD_GENRE_REQUEST:
            return { addLoading: true }

        case ADMIN_ADD_GENRE_SUCCESS:
            return { addLoading: false, genreAdd: action.payload }

        case ADMIN_ADD_GENRE_FAILURE:
            return { loading: false, addError: action.payload }
        default:
            return state;
    }
}

export const adminGenreReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GENRES_FETCH_REQUEST:
            return { loading: true }

        case ADMIN_GENRES_FETCH_SUCCESS:
            return { loading: false, genreData: action.payload }

        case ADMIN_GENRES_FETCH_FAILURE:
            return { loading: false, error: action.payload }
      
            case ADMIN_GENRES_DELETE_REQUEST:
                return { loading: true }
            case ADMIN_GENRES_DELETE_SUCCESS:
                return { loading: false, genreData: action.payload }
            case ADMIN_GENRES_DELETE_FAILURE:
                return { loading: false, error: action.payload }
            default:
                return state
    }
}




// export const addBookReducer = (state = {}, action) => {
//     console.log(action, 'output from server inside reducer');
//     switch (action.type) {
//         case ADMIN_BOOK_ADD_REQUEST:
//             return { loading: true }
//         case ADMIN_BOOK_ADD_SUCCESS:
//             return { loading: false, adminUserData: action.payload }
//         case ADMIN_BOOK_ADD_FAILURE:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }
