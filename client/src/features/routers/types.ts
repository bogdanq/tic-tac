import { Session } from "../../common";

export type RouteContext = {
  session: Session | null;
  token: string | null;
};
