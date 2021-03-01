import { combine } from "effector";
import { useStore } from "effector-react";
import { status } from "patronum/status";
import { useEffect } from "react";

import { useRouter } from "../../features/routers";
import {
  $session,
  $token,
  fetchUser,
  fetchUserFx,
} from "../../features/session";

const store = combine({
  session: $session,
  token: $token,
  pending: fetchUserFx.pending,
  status: status({ effect: fetchUserFx }),
});

export const useInitialApp = () => {
  const { session, token, pending, status } = useStore(store);

  const routes = useRouter({ session: session, token });

  useEffect(() => {
    if (!session && status === "initial") {
      fetchUser();
    }
  }, [session, status]);

  return { status, pending, routes, token };
};
