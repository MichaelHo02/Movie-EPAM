import axiosPrivate from '../axiosPrivate';

const userAPI = {
  getUser: id => {
    const url = `/users/${id}`;
    return axiosPrivate.get(url);
  },
  register: param => {
    const url = `/users/register`;
    return axiosPrivate.post(url, param);
  },
  login: param => {
    const url = `/users/login`;
    return axiosPrivate.post(url, param);
  },
};

export default userAPI;
