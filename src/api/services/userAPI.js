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
    return axiosPrivate.get(url, { params });
  },
  addFriends: body => {
    const url = `/users/friends`;
    return axiosPrivate.post(url, body);
  },
  removeFriends: body => {
    const url = `/users/friends`;
    return axiosPrivate.put(url, body);
  },
};

export default userAPI;
