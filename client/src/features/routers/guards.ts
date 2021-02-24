import { RouteContext } from "./types";

export const onlyAuth = (context: RouteContext) => {
  return Boolean(context.session);
};

export const onlyGuest = (context: RouteContext) => {
  return !Boolean(context.session);
};
