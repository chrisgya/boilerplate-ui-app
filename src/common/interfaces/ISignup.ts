
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