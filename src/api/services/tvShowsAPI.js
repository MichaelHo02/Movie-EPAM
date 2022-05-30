import axiosPublic from '../axiosPublic';

const constParam = {
  api_key: 'e9e9d8da18ae29fc430845952232787c',
  language: 'en-US',
};

const tvShowsAPI = {
  getGenres: () => {
    const url = `/genre/movie/list`;
    return axiosPublic.get(url, { params: constParam });
  },
};

export default tvShowsAPI;
