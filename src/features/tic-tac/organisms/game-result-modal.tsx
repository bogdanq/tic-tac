import React, { useCallback, useState } from "react";
import Modal from "react-modal";

import { TicTac } from "../../../common/types";
import { resetGame } from "../model";

type Props = {
  vinner: TicTac | null;
  isVisible: boolean;
};

export function GameResultModal({ isVisible, vinner }: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    resetGame();
    setIsOpen(false);
  }, []);

  return (
    <Modal
      className="modal"
      isOpen={isVisible || modalIsOpen}
      onRequestClose={() => {
        // setIsOpen(false);
      }}
    >
      <>
        {vinner === TicTac.Empty ? <h1>Ничья</h1> : <h1>Победил {vinner}</h1>}

        <button onClick={handleCloseModal}>Начать заново</button>
      </>
    </Modal>
  );
}
