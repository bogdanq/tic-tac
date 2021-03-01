import { useStore } from "effector-react";
import React from "react";
import styled from "styled-components";
import { $session, logOutFx } from "../../features/session";
import { SubTitle } from "../atoms";
import { Link } from "../atoms/link";

export const Menu = () => {
  const session = useStore($session);

  if (!session) {
    return null;
  }

  const { name } = session;

  return (
    <Wrapper>
      <WrapperWithPadding>
        <UserInfoWrapper>
          <SubTitle>{name}</SubTitle>
        </UserInfoWrapper>
        <Link
          to="/"
          onClick={() => {
            logOutFx();
          }}
        >
          Выход
        </Link>
      </WrapperWithPadding>
    </Wrapper>
  );
};

const UserInfoWrapper = styled.div`
  & h2 {
    margin-right: 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: var(--color-white);
  flex: none;
  box-sizing: content-box;
`;

const WrapperWithPadding = styled(Wrapper)`
  padding: 5px 15px;
`;
