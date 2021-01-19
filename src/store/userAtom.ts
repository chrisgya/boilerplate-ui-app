import { atom } from "jotai";
import { ACCESS_TOKEN } from "../common/utils/constants";

export const isLoginAtom = atom(!!window.sessionStorage.getItem(ACCESS_TOKEN));
export const tokenAtom = atom(window.sessionStorage.getItem(ACCESS_TOKEN) || null);