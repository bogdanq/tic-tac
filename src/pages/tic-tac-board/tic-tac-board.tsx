import React from "react";
import styled, { css } from "styled-components";

import { GameStatus, TicTac } from "../../common/types";
import { GameResultModal, handleSceneClick } from "../../features/tic-tac";
import { usePageState } from "./hooks/use-page-state";

export function TicTacBoard() {
  const { scene, currentStep, gameStatus } = usePageState();

  const isVisible = gameStatus.game === GameStatus.Finished;

  return (
    <div className="App">
      <h1>Крестики нолики</h1>
      <h2>
        Текущий ход: <span>{currentStep}</span>
      </h2>
      <Grid>
        {scene.map((ceil, index) => (
          <Ceil
            key={index}
            onClick={() => {
              if (!ceil && currentStep !== TicTac.Zero) {
                handleSceneClick(index);
              }
            }}
            type={ceil}
          >
            {ceil}
          </Ceil>
        ))}
      </Grid>
      <GameResultModal vinner={gameStatus.vinner} isVisible={isVisible} />
    </div>
  );
}

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 180px;
`;

const Ceil = styled.div<{ type: TicTac }>`
  margin: 3px;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  ${({ type }) => {
    switch (type) {
      case TicTac.Cross:
        return css`
          background: #adc0df87;
          color: #adc0df;
          border-color: #adc0df;
        `;
      case TicTac.Zero:
        return css`
          background: #fff6d5;
          color: #fd5;
          border-color: #fd5;
        `;
      default:
        return "";
    }
  }}

  &:hover {
    box-shadow: 0px 3px 14px -3px rgba(0, 0, 0, 0.75);
  }
`;
