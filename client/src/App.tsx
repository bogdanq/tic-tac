import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { PageWrapper, HomeLoader } from "./ui";
import { useInitialApp } from "./common";

export function App() {
  const { routes, pending } = useInitialApp();

  if (pending) {
    return <HomeLoader />;
  }

  return (
    <PageWrapper>
      <BrowserRouter>
        <Switch>{routes}</Switch>
      </BrowserRouter>
    </PageWrapper>
  );
}
