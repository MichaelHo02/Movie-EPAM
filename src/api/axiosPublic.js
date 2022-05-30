import axios from 'axios';
import queryString from 'query-string';

const axiosPublic = axios.create({
  baseUrl: 'http://localhost:5000',
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
