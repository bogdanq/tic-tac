import styled from "styled-components";

export const Button = styled.button`
  outline: none;
  background-color: var(--color-primary-background-button);
  border: none;
  border-radius: 5px;
  height: 30px;
  padding: 5px;
  font-size: 13px;
  color: var(--color-white);
  cursor: pointer;
  transition: 0.5s;

  &:hover:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
