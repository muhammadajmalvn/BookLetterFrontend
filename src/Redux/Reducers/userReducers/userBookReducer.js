import {
    USER_GET_BOOKS_REQUEST,
    USER_GET_BOOKS_SUCCESS,
    USER_GET_BOOKS_FAILURE,

    USER_GET_GENRE_BOOKS_REQUEST,
    USER_GET_GENRE_BOOKS_SUCCESS,
    USER_GET_GENRE_BOOKS_FAILURE,

    USER_BOOK_SEARCH_REQUEST,
    USER_BOOK_SEARCH_SUCCESS,
    USER_BOOK_SEARCH_FAILURE,
    USER_GENRES_FETCH_REQUEST,
    USER_GENRES_FETCH_SUCCESS,
    USER_GENRES_FETCH_FAILURE,
} from '../../Constants/userConstants'



export const userGetBookReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_BOOKS_REQUEST:
            return { booksDataLoading: true }
        case USER_GET_BOOKS_SUCCESS:
            return { booksDataLoading: false, booksData: action.payload }
        case USER_GET_BOOKS_FAILURE:
            return { booksDataLoading: false, booksDataError: action.payload }
        case USER_GET_GENRE_BOOKS_REQUEST:
            return { booksDataLoading: true }
        case USER_GET_GENRE_BOOKS_SUCCESS:
            return { loading: false, booksData: action.payload }
        case USER_GET_GENRE_BOOKS_FAILURE:
            return { loading: false, booksDataError: action.payload }
        case USER_BOOK_SEARCH_REQUEST:
            return { booksDataLoading: true }

        case USER_BOOK_SEARCH_SUCCESS:
            return { booksDataLoading: false, booksData: action.payload }

        case USER_BOOK_SEARCH_FAILURE:
            return { booksDataLoading: false, booksDataError: action.payload }
        default:
            return state
    }
}


export const userGenreReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GENRES_FETCH_REQUEST:
            return { loading: true }

        case USER_GENRES_FETCH_SUCCESS:
            return { loading: false, genreData: action.payload }

        case USER_GENRES_FETCH_FAILURE:
            return { loading: false, error: action.payload }
    
            default:
                return state
    }
}


