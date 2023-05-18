import axios from 'axios'
const API = axios.create({ baseURL: "https://bookletterbackend.onrender.com" })
const user = JSON.parse(localStorage.getItem('user-login'))
const ID = user?.id
const config = {
    headers: {
        "Content-Type": "application/json",
    }
}

const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.token
    }
}
const configFormData = {
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user?.token
    }
}

//books data api
export const userGetBooksAPI = () => API.get('/books', config)
export const userBookSearchAPI = (searchTerm) => API.post('/search-book', { searchTerm }, config)

//genres API
export const userGetGenresAPI = () => API.get('/genres', config)
export const userGetGenreBooksAPI = (genre) => API.post('/genrebooks', { genre }, config)

//addresses api
export const userAddAddressAPI = (address) => API.post('/add-address?id=' + ID, { address }, configToken)
export const userGetAddressesAPI = () => API.get('/get-address?id=' + ID, configToken)

//sell-books api
export const userSellBookAPI = (formdata) => API.post('/sell-book?id=' + ID, formdata, configFormData)
export const userGetSellRequestsAPI = () => API.get('/sell-requests?id=' + ID, configToken)
export const userSendSellBookAPI = (orderId, trackingId) => API.post('/sell-requests?id=' + orderId, { trackingId }, configToken)

//wallet api
export const userGetWalletAPI = () => API.get('/get-wallet?id=' + ID, configToken)

//order api
export const userOrderAPI = (bookingData) => API.post('/booking-book', { bookingData }, configToken)

//chat
export const getAllUserContacts = () => API.get("/contacts?id=" + ID, configToken)
export const sendMessageAPI = (data) => API.post("/add-message", { data }, configToken)
export const getAllMessagesAPI = (data) => API.post("/get-all-messages", { data }, configToken)
export const sendImageAPI = (data) => API.post("/send-image", { data }, configToken)   