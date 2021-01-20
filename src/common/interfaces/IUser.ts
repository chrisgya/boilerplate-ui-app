
export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    middleName: string;
    lastname: string;
    pictureUrl: string;
    authorities: string[];
}

export interface ISignupRequest {
    username: string;
    email: string;
    firstName: string;
    middleName: string | null;
    lastname: string;
    password: string;
    confirmPassword: string;
    roleIds: number[] | null;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IChangePasswordRequest {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}