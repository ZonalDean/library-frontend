import axios from '../config/axios';

export const getBooksDisplay = (tag) => axios.post('public/bookdisplay', {tag})