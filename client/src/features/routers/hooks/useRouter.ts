import { useMemo } from "react";
import { createRoutes } from "react-router-reconfig";
import { getRoutes } from "../config";
import { RouteContext } from "../types";

export const useRouter = (context: RouteContext) => {
  const routes = useMemo(
    () =>
      createRoutes<RouteContext>({
        config: getRoutes,
        context,
      }),
    [context]
  );

  return routes;
};
