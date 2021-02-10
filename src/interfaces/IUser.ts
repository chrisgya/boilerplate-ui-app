
export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    pictureUrl: string;
    createdAt: Date,
    lastUpdatedAt: Date,
    authorities: string[];
}

export interface IRole {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date
}

export interface IPermission {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date
}

export interface IUpdateUserRequest {
    firstName: string;
    middleName: string | null;
    lastName: string;
}

export interface IEmailRequest {
    email: string;
}

export interface IUsernameRequest {
    username: string;
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