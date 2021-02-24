import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useStore } from "effector-react";

import { useRouter } from "./features/routers";
import { $session } from "./features/session";
import { PageWrapper } from "./ui";

export function App() {
  const session = useStore($session);

  const routes = useRouter({ session });

  return (
    <PageWrapper>
      <BrowserRouter>
        <Switch>{routes}</Switch>
      </BrowserRouter>
    </PageWrapper>
  );
}
