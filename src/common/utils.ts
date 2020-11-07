import { createEvent, Event, forward } from "effector";
import { delay } from "patronum/delay";

import { TicTac } from "./types";

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
  // TicTac.Zero,
  // TicTac.Empty,
  // TicTac.Cross,
  // TicTac.Cross,
  // TicTac.Empty,
  // TicTac.Cross,
  // TicTac.Empty,
  // TicTac.Zero,
  // TicTac.Zero
];

function emptyIndices() {
  return areaMockData
    .map((item, index) => {
      if (!Boolean(item)) {
        return index;
      }

      return undefined;
    })
    .filter(Boolean);
}

function winner() {
  if (checkTicTacCeilsByName(areaMockData, "Cross")) {
    return { score: -10 };
  }

  if (checkTicTacCeilsByName(areaMockData, "Zero")) {
    return { score: 10 };
  }

  if (areaMockData.every((ceil) => Boolean(ceil))) {
    return { score: 0 };
  }
}

function minimax() {
  //доступные клетки
  const availSpots = emptyIndices();

  const moves = [];
}

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
