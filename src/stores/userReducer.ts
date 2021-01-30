export enum UserTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export type UserInitialStateType = {
    info: any;
    isLoggedIn: boolean;
};

export type UserActions =
    | { type: UserTypes.LOGIN; payload: any }
    | { type: UserTypes.LOGOUT };

export const userReducer = (state: UserInitialStateType, action: UserActions) => {

    switch (action.type) {
        case UserTypes.LOGIN:
            state.isLoggedIn = true;
            state.info = action.payload;
            return state;
        case UserTypes.LOGOUT:
            state.isLoggedIn = false;
            state.info = null;
            return state;
        default:
            return state;
    }
};