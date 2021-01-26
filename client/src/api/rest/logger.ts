import { AxiosInstance, AxiosError } from "axios";

const NO_CONNECTION_MESSAGE =
  "Проверьте интернет подключение и попробуйте снова";

const isNetworkError = (error: AxiosError) => error.message === "Network Error";

export function withLogger(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (request) => {
      console.log(
        `%c AXIOS [request] ${request.url}:`,
        "color: #008000; font-weight: bold",
        request
      );
      return request;
    },
    (error) => {
      console.log(`%c AXIOS [request]`, "color: red; font-weight: bold", error);

      if (isNetworkError(error)) {
        return Promise.reject(new Error(NO_CONNECTION_MESSAGE));
      }

      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (config) => {
      console.log(
        `%c AXIOS [response-sucess]: ${config.config.url}`,
        "color: #008000; font-weight: bold",
        config
      );

      return config;
    },
    (error) => {
      console.log(
        `%c AXIOS [response-error]`,
        "color: red; font-weight: bold",
        error
      );

      if (isNetworkError(error)) {
        return Promise.reject(new Error(NO_CONNECTION_MESSAGE));
      }

      return Promise.reject(error);
    }
  );

  return axios;
}
