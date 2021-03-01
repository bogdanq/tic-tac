import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createEvent, createStore, Effect, forward } from "effector";
import { persist } from "effector-storage/local";

import type { ApiError } from "../api/rest";

export function attachFailedNotification<P, R>(
  fx: Effect<P, AxiosResponse<R>, AxiosResponse<ApiError>>
) {
  const createNotification = createEvent<AxiosResponse<ApiError>>();

  forward({
    from: fx.failData,
    to: createNotification,
  });

  createNotification.watch(({ data }) => toast(data.error, { type: "error" }));
}

export function createStoreWithPersist<T>(initialValue: T, key: string) {
  const $store = createStore<T>(initialValue);

  persist({ store: $store, key });

  return $store;
}
