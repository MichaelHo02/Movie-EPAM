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

  getTvShows: params => {
    const url = `/discover/tv`;
    return axiosPublic.get(url, { params: { ...constParam, ...params } });
  },
};

export default tvShowsAPI;
