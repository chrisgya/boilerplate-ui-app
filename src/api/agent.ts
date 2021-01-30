import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IChangePasswordRequest, IUser, ILoginRequest, ILoginResponse, IResetPasswordRequest, ISignupRequest } from "../common/interfaces/IUser";
import { ACCESS_TOKEN } from "../common/utils/constants";
import { logout } from "../common/utils/helper";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem(ACCESS_TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {

  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  } else {
    // const { status, data, config, headers } = error.response;
    const status = error?.response?.status;
    if (status === 401) {
      logout();
      toast.info("Your session has expired, please login again");
    }
    // else if (status === 404) {
    //   history.push("/notfound");
    // } 
    // else if (status === 400 && config.method === "get" && data.errors.hasOwnProperty("id")) {
    //   history.push("/notfound");
    // }
    else if (status === 500) {
      toast.error("Server error - check the terminal for more info!");
    }
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  // get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios.post(url, formData, { headers: { "Content-type": "multipart/form-data" } }).then(responseBody);
  },
};

const User = {
  me: (): Promise<IUser> => requests.get("/users/me"),
  changePassword: (req: IChangePasswordRequest): Promise<void> => requests.post(`/users/change-password`, req),
  login: (req: ILoginRequest): Promise<ILoginResponse> => requests.post(`/auth/login`, req),
  refreshToken: (token: string): Promise<ILoginResponse> => requests.get(`/auth/refresh-token/${token}`),
  signup: (user: ISignupRequest): Promise<IUser> => requests.post(`/auth/signup`, user),
  checkUsernameExist: (username: string): Promise<boolean> => requests.get(`/auth/username-exist/${username}`),
  checkEmailExist: (email: string): Promise<boolean> => requests.get(`/auth/email-exist/${email}`),
  verifyAccount: (token: string): Promise<void> => requests.put(`/auth/verify-account/${token}`, {}),
  forgotPassword: (email: string): Promise<void> => requests.put(`/auth/forgot-password/${email}`, {}),
  requestConfirmationLink: (email: string): Promise<void> => requests.put(`/auth/request-confirmation-link/${email}`, {}),
  resetPassword: (req: IResetPasswordRequest): Promise<void> => requests.put(`/auth/reset-password/${req.token}`, req),
};


// const Activities = {
//   list: (params: URLSearchParams): Promise<IActivitiesEnvelope> =>
//     axios.get("/activities", { params: params }).then(responseBody),
//   details: (id: string) => requests.get(`/activities/${id}`),
//   create: (activity: IActivity) => requests.post("/activities", activity),
//   update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
//   delete: (id: string) => requests.del(`/activities/${id}`),
//   attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
//   unattend: (id: string) => requests.del(`/activities/${id}/attend`),
// };


// const Profiles = {
//   get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
//   uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
//   setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
//   deletePhoto: (id: string) => requests.del(`/photos/${id}`),
//   updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile),
//   follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
//   unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
//   listFollowings: (username: string, predicate: string) =>
//     requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
//   listActivities: (username: string, predicate?: string) =>
//     requests.get(`/profiles/${username}/activities?predicate=${predicate}`),
// };

const agent = {
  // Activities,
  User,
  // Profiles,
};

export default agent;
