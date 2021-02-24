import React from "react";
import { ErrorMessage as DefaultMessage } from "formik";
import styled from "styled-components";

export const ErrorMessage = ({ name }: { name: string }) => {
  return (
    <Wrapper>
      <DefaultMessage name={name} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-error-text);
  font-size: 13px;
`;
