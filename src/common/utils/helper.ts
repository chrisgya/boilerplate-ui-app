import jwt_decode from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { history } from "../..";

export const decodeToken = (token: string) => jwt_decode(token);

export const logout = () => {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    history.push("/login");
}

export const getQueryString = (locationHook: any, paramName: string) => {
    const searchParams = new URLSearchParams(locationHook().search);
    return searchParams.get(paramName)
}