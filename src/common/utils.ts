import { createEvent, Event, forward } from "effector";
import { delay } from "patronum/delay";

import { Game, GameStatus, TicTac } from "./types";

export const mockUsers = [
  { name: "bogdan", type: TicTac.Cross, ai: false },
  { name: "dima", type: TicTac.Zero, ai: false },
];

export const mockAi = { name: "Ai bot", type: TicTac.Zero, ai: true };

export function checkTicTacCeilsByName(
  state: TicTac[],
  name: "Cross" | "Zero"
) {
  if (
    (state[0] === TicTac[name] &&
      state[1] === TicTac[name] &&
      state[2] === TicTac[name]) ||
    (state[3] === TicTac[name] &&
      state[4] === TicTac[name] &&
      state[5] === TicTac[name]) ||
    (state[6] === TicTac[name] &&
      state[7] === TicTac[name] &&
      state[8] === TicTac[name]) ||
    (state[0] === TicTac[name] &&
      state[3] === TicTac[name] &&
      state[6] === TicTac[name]) ||
    (state[1] === TicTac[name] &&
      state[4] === TicTac[name] &&
      state[7] === TicTac[name]) ||
    (state[2] === TicTac[name] &&
      state[5] === TicTac[name] &&
      state[8] === TicTac[name]) ||
    (state[0] === TicTac[name] &&
      state[4] === TicTac[name] &&
      state[8] === TicTac[name]) ||
    (state[6] === TicTac[name] &&
      state[4] === TicTac[name] &&
      state[2] === TicTac[name])
  ) {
    return true;
  }

  return false;
}

export const areaMockData = [
  TicTac.Empty,
  TicTac.Empty,
  TicTac.Empty,
  TicTac.Empty,
  TicTac.Empty,
  TicTac.Empty,
  TicTac.Empty,
  TicTac.Empty,
  TicTac.Empty,
];

export function getFreeIndexByArray(arr: TicTac[]): number {
  const maxIndex = arr.length;
  const index = Math.floor(Math.random() * maxIndex);

  const markedCellsLength = arr.filter(Boolean).length;

  if (arr[index] && markedCellsLength !== maxIndex) {
    return getFreeIndexByArray(arr);
  }

  return index;
}

export function delayWithForward<T>({
  to,
  timeout,
}: {
  to: Event<T>;
  timeout: number;
}) {
  const event = createEvent<T>("trigger by delay");

  const delayed = delay({ source: event, timeout });

  forward({ from: delayed, to });

  return event;
}

export function updateSceneListener(
  state: TicTac[],
  changeGameStatus: Event<Game>
) {
  if (checkTicTacCeilsByName(state, "Cross")) {
    changeGameStatus({
      game: GameStatus.Finished,
      vinner: TicTac.Cross,
    });

    return state;
  }

  if (checkTicTacCeilsByName(state, "Zero")) {
    changeGameStatus({
      game: GameStatus.Finished,
      vinner: TicTac.Zero,
    });

    return state;
  }

  if (state.every((ceil) => Boolean(ceil))) {
    changeGameStatus({
      game: GameStatus.Finished,
      vinner: TicTac.Empty,
    });

    return state;
  }
}
