import axios from 'axios';
import queryString from 'query-string';

const axiosPrivate = axios.create({
  baseURL: 'https://movie-epam.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosPrivate.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    throw error;
  }
);

export default axiosPrivate;
