import React, { createContext, useReducer, Dispatch } from "react";
import { UserActions, UserInitialStateType, userReducer } from "./userReducer";

const userInitialState = {
    info: window.sessionStorage.getItem('user') || null,
    isLoggedIn: !!window.sessionStorage.getItem('user') && !!window.sessionStorage.getItem('jwt')
};

type InitialStateType = {
    user: UserInitialStateType;
};

const initialState = {
    user: userInitialState,
};

const AppContext = createContext<{ state: InitialStateType; dispatch: Dispatch<UserActions> }>({
    state: initialState,
    dispatch: () => null,
});

const mainReducer = ({ user }: InitialStateType, action: UserActions) => ({
    user: userReducer(user, action),
});


const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}> {children} </AppContext.Provider>;
};

export { AppProvider, AppContext };
