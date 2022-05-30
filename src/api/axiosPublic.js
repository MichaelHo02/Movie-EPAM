import axios from 'axios';
import queryString from 'query-string';

const axiosPublic = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosPublic.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    throw error;
  }
);

export default axiosPublic;
