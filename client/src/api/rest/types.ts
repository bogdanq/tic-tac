import { Methods } from "../ws/types";

export type ApiError = {
  method: Methods;
  error: string;
  code: number;
};

export type ApiResponse = {
  data: {
    payload: any;
  };
};
