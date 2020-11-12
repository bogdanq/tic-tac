import { combine } from "effector";
import { useStore } from "effector-react";

import {
  $currentStep,
  $gameStatus,
  $scene,
  $currenUser,
  $hasAiInGame,
  $users,
} from "../../../features/tic-tac/model";

const combinedStore = combine({
  scene: $scene,
  currentStep: $currentStep,
  gameStatus: $gameStatus,
  currenUser: $currenUser,
  hasAiInGame: $hasAiInGame,
  users: $users,
});

export function usePageState() {
  const store = useStore(combinedStore);

  return store;
}
