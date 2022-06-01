import axiosPrivate from '../axiosPrivate';

const filmAPI = {
  getFilms: params => {
    const url = `/films`;
    return axiosPrivate.get(url, { params });
  },
  addLikeFilmTo: (body, params) => {
    const url = `/films`;
    return axiosPrivate.post(url, body, { params });
  },
  removeLikeFilmFrom: (id, params) => {
    const url = `/films/${id}`;
    return axiosPrivate.delete(url, { params });
  },
};

export default filmAPI;
