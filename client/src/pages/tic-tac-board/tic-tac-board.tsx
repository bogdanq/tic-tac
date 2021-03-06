import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { $connect, connect } from "../../api/ws/client";
import { GameStatus, TicTac } from "../../common/types";
import {
  GameResultModal,
  handleSceneClick,
  addAiToScene,
} from "../../features/tic-tac";
import { Chat } from "../../features/chat";
import { usePageState } from "./hooks/use-page-state";
import { useStore } from "effector-react";
import { Menu, Row } from "../../ui";

export function TicTacBoard() {
  const { scene, hasAiInGame, gameStatus, currenUser, users } = usePageState();
  const { isConnected } = useStore($connect);

  useEffect(() => {
    connect();
  }, []);

  const isVisible = gameStatus.game === GameStatus.Finished;

  if (!isConnected) {
    return <h1>Подключение</h1>;
  }

  return (
    <div style={{ background: "#fff", width: "100%" }}>
      <Row>
        <Chat />
        <div style={{ width: "50%" }}>
          <Menu />
          <h1>Крестики нолики</h1>
          <div>
            <span>Играть с ботом</span>
            <input
              type="checkbox"
              checked={hasAiInGame}
              onChange={({ target }) => {
                addAiToScene(target.checked);
              }}
            />
            {users.map((user) => (
              <p key={user.name}>{user.name}</p>
            ))}
          </div>
          <h2>
            Текущий ход:
            <span>{currenUser?.name}</span>
          </h2>
          <Grid>
            {scene.map((ceil, index) => (
              <Ceil
                key={index}
                onClick={() => {
                  if (!ceil && !currenUser?.ai) {
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
      </Row>
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
