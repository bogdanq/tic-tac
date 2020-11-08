import { createStore, createEvent, sample, guard, combine } from "effector";

import { GameStatus, TicTac, Game, User } from "../../../common/types";
import {
  areaMockData,
  getFreeIndexByArray,
  delayWithForward,
  updateSceneListener,
  mockUsers,
  mockAi,
} from "../../../common/utils";

export const handleSceneClick = createEvent<number>("cross or zero move");

export const addAiToScene = createEvent<boolean>();

export const resetGame = createEvent("reset game");

export const updateGameStatus = createEvent<Game>();

const handleSceneClickByAi = delayWithForward<number>({
  to: handleSceneClick,
  timeout: 1000,
});

export const $scene = createStore<TicTac[]>(areaMockData);

export const $users = createStore<User[]>(mockUsers);

export const $currentStep = createStore<TicTac>(TicTac.Cross);

export const $hasAiInGame = $users.map((users) =>
  Boolean(users.find((user) => user.ai))
);

export const $gameStatus = createStore<Game>({
  game: GameStatus.Start,
  vinner: null,
});

export const $currenUser = combine($users, $currentStep).map(([users, step]) =>
  users.find((user) => user.type === step)
);

sample({
  source: addAiToScene,
  clock: guard({
    source: addAiToScene,
    filter: $gameStatus.map(({ game }) => game === GameStatus.Start),
  }),
  fn: (checked) => {
    if (checked) {
      const [user] = mockUsers;

      return [user, mockAi];
    }

    return mockUsers;
  },
  target: $users,
});

const sceneWasChange = sample({
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

const changeActiveUser = guard({
  source: sceneWasChange,
  filter: $gameStatus.map(({ game }) => game === GameStatus.Pending),
});

guard({
  source: $scene,
  filter: combine($gameStatus, $currenUser).map(([status, user]) => {
    return status.game === GameStatus.Pending && Boolean(user?.ai);
  }),
  // @TODO пофиксить тип
  // @ts-ignore
  target: handleSceneClickByAi.prepend((scene: TicTac[]) => {
    return getFreeIndexByArray(scene);
  }),
});

$gameStatus
  .on(updateGameStatus, (_, params) => params)
  .on(handleSceneClick, (state) => {
    if (state.game !== GameStatus.Pending) {
      return {
        game: GameStatus.Pending,
        vinner: null,
      };
    }

    return state;
  })
  .reset(resetGame);

$currentStep
  .on(changeActiveUser, (step) => {
    if (step === TicTac.Cross) {
      return TicTac.Zero;
    }

    return TicTac.Cross;
  })
  .reset(resetGame);

$scene
  .on(sceneWasChange, (scene) => updateSceneListener(scene, updateGameStatus))
  .reset(resetGame);
