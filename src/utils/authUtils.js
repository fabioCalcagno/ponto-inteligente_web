import {JwtInfoParser} from './tokenParser';

export const TOKEN_KEY = '@pontoIntelgente-Token';
export const setToken = (token) =>  sessionStorage.setItem(TOKEN_KEY, token);
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const isAuthenticated = () => getToken() !== null;
export const getAuthTokenAuthorization = () => 'Bearer ' + getToken();
export const logOut = () => sessionStorage.removeItem(TOKEN_KEY);







