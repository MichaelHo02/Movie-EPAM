import axiosPublic from '../axiosPublic';

const constParam = {
  api_key: 'e9e9d8da18ae29fc430845952232787c',
  language: 'en-US',
};

const moviesAPI = {
  getGenres: () => {
    const url = `/genre/movie/list`;
    return axiosPublic.get(url, { params: constParam });
  },

  getMovies: params => {
    const url = `/discover/movie`;
    return axiosPublic.get(url, { params: { ...constParam, ...params } });
  },

  getMovie: id => {
    const url = `/movie/${id}`;
    return axiosPublic.get(url, { params: constParam });
  },
};

export default moviesAPI;
