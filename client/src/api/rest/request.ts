import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getCookie } from "../../features/session/utils";
import { withLogger } from "./logger";

class Request {
  private token: string | null;
  private request: AxiosInstance;

  constructor(token: string) {
    this.token = token || null;
    this.request = withLogger(
      axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 1000,
      })
    );
  }

  private requestWithToken = (token: string | null) => ({
    headers: { "x-token": token },
  });

  setToken = (token: string) => {
    this.token = token;
  };

  get = <R extends {}>(
    url: string,
    withAuth = false
  ): Promise<AxiosResponse<R>> => {
    let config = {};

    if (withAuth) {
      config = this.requestWithToken(this.token);
    }

    return this.request.get(url, config);
  };

  post = <T extends {}, R extends {}>(
    url: string,
    data: T,
    withAuth = false
  ): Promise<AxiosResponse<R>> => {
    let config = {};

    if (withAuth) {
      config = this.requestWithToken(this.token);
    }

    return this.request.post(url, data, config);
  };

  delete = <T extends {}, R extends {}>(
    url: string,
    data: T,
    withAuth = false
  ): Promise<AxiosResponse<R>> => {
    let config = {};

    if (withAuth) {
      config = this.requestWithToken(this.token);
    }

    return this.request.delete(url, { data: data ?? {}, ...config });
  };
}

export const request = new Request(getCookie("x-token"));
