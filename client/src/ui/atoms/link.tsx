import styled from "styled-components";
import { NavLink as DefaultLink } from "react-router-dom";

export const Link = styled(DefaultLink)`
  text-decoration: none;
  color: var(--color-black);
  font-size: 14px;

  &.is-active {
    text-decoration: underline;
  }

  &:hover {
    text-decoration: underline;
  }
`;
