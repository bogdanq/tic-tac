export enum TicTac {
  Cross = "X",
  Zero = "O",
  Empty = "",
}

export enum GameStatus {
  Finished = "Finished",
  Pending = "Pending",
  Start = "Start",
}

export type Game = {
  game: GameStatus;
  vinner: TicTac | null;
};

export type User = {
  name: string;
  type: TicTac;
  ai: boolean;
};
