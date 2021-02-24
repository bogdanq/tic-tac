import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  text-align: center;
  margin-top: calc(50vh - 50%);
  border: 1px solid var(--color-default-border);
  padding: 50px;
  border-radius: 5px;
  background: #fff;

  & > input,
  & > button {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  & > h1 {
    margin-top: 0;
    margin-bottom: 35px;
  }
`;
