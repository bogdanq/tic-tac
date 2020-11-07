import { combine } from "effector";
import { useStore } from "effector-react";

import {
  $currentStep,
  $gameStatus,
  $scene,
} from "../../../features/tic-tac/model";

export function usePageState() {
  const combinedStore = combine({
    scene: $scene,
    currentStep: $currentStep,
    gameStatus: $gameStatus,
  });

  const store = useStore(combinedStore);

  return store;
}
