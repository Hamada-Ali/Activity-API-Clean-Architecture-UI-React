import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/router";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

// axios interceptor
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (err: AxiosError) => {
    const { data, status, config } = err.response as AxiosResponse;

    switch (status) {
      case 400:
        if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
            router.navigate('/not-found')
        }
        if(data.errors) {
            const modalStateErrors = [];

            for(const key in data.errors) {
                if(data.errors[key]) {
                    modalStateErrors.push(data.errors[key])
                } 
            }
            throw modalStateErrors.flat()
        } else {
            toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate('/not-found')
        break;
      case 500:
        store.CommonStore.setServerError(data)
        router.navigate('/server-error')
        break;
    }
    return Promise.reject(err);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<IActivity[]>("/activities"),
  details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity) => requests.post<void>("/activities", activity),
  update: (activity: IActivity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
