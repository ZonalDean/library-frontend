import axios from '../config/axios';

export const getBooksDisplay = (tag) => axios.get('public/bookdisplay', {tag})