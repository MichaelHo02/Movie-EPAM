import axiosPrivate from '../axiosPublic';

const filmAPI = {
  getFilms: () => {
    const url = `/films`;
    return axiosPrivate.get(url);
  },
  addLikeFilmTo: (body, params) => {
    const url = `/films`;
    return axiosPrivate.post(url, body, params);
  },
};

export default filmAPI;
