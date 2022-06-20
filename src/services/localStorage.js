const USER_ACCESS_TOKEN = 'userAccessToken';
const STAFF_ACCESS_TOKEN = 'staffAccessToken';

export const getUserAccessToken = () => localStorage.getItem(USER_ACCESS_TOKEN);
export const setUserAccessToken = token =>
  localStorage.setItem(USER_ACCESS_TOKEN, token);
export const removeUserAccessToken = () => localStorage.removeItem(USER_ACCESS_TOKEN);