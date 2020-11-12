import { sample, Store, createEvent, guard } from "effector";
import { User } from "../../../common/types";
import { mockAi, mockUsers } from "../../../common/utils";

export const addAiToScene = createEvent<boolean>();

export function addAiToUserList({
  filter,
  target,
}: {
  filter: Store<boolean>;
  target: Store<User[]>;
}) {
  sample({
    source: guard({
      source: addAiToScene,
      filter,
    }),
    fn: (checked) => {
      if (checked) {
        const [user] = mockUsers;

        return [user, mockAi];
      }

      return mockUsers;
    },
    target,
  });
}
