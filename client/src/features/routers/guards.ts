import { RouteContext } from "./types";

export const onlyAuth = (context: RouteContext) => {
  return Boolean(context.session) || Boolean(context.token);
};

export const onlyGuest = (context: RouteContext) => {
  return !(context.session || context.token);
};
