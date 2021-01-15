export interface IResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}