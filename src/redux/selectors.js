export const getSignUpUsername = state => state.authInfo.data.username;
export const getSignUpEmail = state => state.authInfo.data.email;
export const getSignUpPassword = state => state.authInfo.data.password;
export const getResponse = state => state.authInfo.response;
export const getAuthInfo = state => state.authInfo;

export const getGenresInfo = state => state.genreInfo;

export const getFilmInfo = state => state.filmInfo;

export const getFilterInfo = state => state.filterInfo;

export const getUsersInfo = state => state.userInfo;

export const getFriendFavoriteInfo = state => state.friendFavorite;
