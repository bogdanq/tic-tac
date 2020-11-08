import React from "react";
import Modal from "react-modal";
import { TicTacBoard } from "./pages/tic-tac-board/tic-tac-board";

Modal.setAppElement("#root");

export function App() {
  return (
    <>
      <TicTacBoard />
    </>
  );
}
