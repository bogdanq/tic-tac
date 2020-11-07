import { createStore, createEvent, sample, guard, combine } from "effector";

import { GameStatus, TicTac, Game } from "../../../common/types";
import {
  checkTicTacCeilsByName,
  areaMockData,
  getFreeIndexByArray,
  delayWithForward,
} from "../../../common/utils";

export const handleSceneClick = createEvent<number>("cross or zero move");

const handleSceneClickByAi = delayWithForward<number>({
  to: handleSceneClick,
  timeout: 1000,
});

export const resetGame = createEvent("reset game");

export const checkGameStatus = createEvent<Game>();

export const $scene = createStore<TicTac[]>(areaMockData);

export const $currentStep = createStore<TicTac>(TicTac.Cross);

export const $gameStatus = createStore<Game>({
  game: GameStatus.Pending,
  vinner: null,
});

const sceneHasChange = sample({
  source: combine($currentStep, $scene),
  clock: handleSceneClick,
  fn: ([step, scene], index) => {
    if (scene[index]) {
      return scene;
    }

    const result = [...scene];
    result[index] = step;

    return result;
  },
  target: $scene,
});

const stepCanChange = guard({
  source: sceneHasChange,
  filter: $gameStatus.map(({ game }) => game === GameStatus.Pending),
});

guard({
  source: $scene,
  filter: combine($currentStep, $gameStatus).map(([step, status]) => {
    return step === TicTac.Zero && status.game === GameStatus.Pending;
  }),
  // @TODO пофиксить тип
  // @ts-ignore
  target: handleSceneClickByAi.prepend((scene: TicTac[]) => {
    return getFreeIndexByArray(scene);
  }),
});

$gameStatus.on(checkGameStatus, (_, params) => params).reset(resetGame);

$currentStep
  .on(stepCanChange, (step) => {
    if (step === TicTac.Cross) {
      return TicTac.Zero;
    }

    return TicTac.Cross;
  })
  .reset(resetGame);

$scene
  .on(sceneHasChange, (state) => {
    if (checkTicTacCeilsByName(state, "Cross")) {
      checkGameStatus({
        game: GameStatus.Finished,
        vinner: TicTac.Cross,
      });

      return state;
    }

    if (checkTicTacCeilsByName(state, "Zero")) {
      checkGameStatus({
        game: GameStatus.Finished,
        vinner: TicTac.Zero,
      });

      return state;
    }

    if (state.every((ceil) => Boolean(ceil))) {
      checkGameStatus({
        game: GameStatus.Finished,
        vinner: TicTac.Empty,
      });

      return state;
    }
  })
  .reset(resetGame);
