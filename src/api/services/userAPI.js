import axiosPrivate from '../axiosPrivate';

const userAPI = {
  getUser: id => {
    const url = `/users/${id}`;
    return axiosPrivate.get(url);
  },
  register: body => {
    const url = `/users/register`;
    return axiosPrivate.post(url, body);
  },
  login: body => {
    const url = `/users/login`;
    return axiosPrivate.post(url, body);
  },
  users: params => {
    const url = `/users`;
    console.log(params);
    return axiosPrivate.get(url, { params });
  },
};

export default userAPI;
