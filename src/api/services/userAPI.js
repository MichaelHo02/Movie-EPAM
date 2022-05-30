import axiosPrivate from '../axiosPrivate';

const userAPI = {
  getUser: id => {
    const url = `/users/${id}`;
    return axiosPrivate.get(url);
  },
};

export default userAPI;
