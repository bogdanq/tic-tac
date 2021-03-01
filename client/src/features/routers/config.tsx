import React from "react";
import { Redirect } from "react-router-dom";
import { RouteTypes } from "react-router-reconfig";

import { Login, Registration, TicTacBoard, NotFound } from "../../pages";
import { onlyAuth, onlyGuest } from "./guards";
import { RouteContext } from "./types";

export const getRoutes: RouteTypes<RouteContext> = [
  {
    component: Login,
    path: "/sign-in",
    guards: [onlyGuest],
    fallback: () => <Redirect to="/" />,
  },
  {
    component: Registration,
    path: "/sign-up",
    guards: [onlyGuest],
    fallback: () => <Redirect to="/" />,
  },
  {
    component: TicTacBoard,
    path: "/",
    guards: [onlyAuth],
    fallback: () => <Redirect to="/sign-in" />,
  },
  {
    path: "*",
    component: NotFound,
  },
];
