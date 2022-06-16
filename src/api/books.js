import axios from '../config/axios';

export const getBooksDisplay = (tag) => axios.get(`public/bookdisplay/${tag}`)
export const getBookById = (id) => axios.get(`public/book/${id}`)