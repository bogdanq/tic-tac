import React, { useReducer } from "react";
import { Field, FieldProps } from "formik";
import styled, { css } from "styled-components";
import { ErrorMessage } from "./input-error";

export const Input = styled.input<{ sizeInput?: "default" | "large" }>`
  display: block;
  border: 1px solid var(--color-default-border);
  border-radius: 5px;
  height: 25px;
  padding: 5px;
  font-size: 13px;
  color: var(--color-default-text);
  outline: none;
  transition: all 0.5s;
  background: var(--color-primary-background);
  flex: none;

  ${({ sizeInput }) => {
    switch (sizeInput) {
      case "large":
        return css`
          width: auto;
          height: 50px;
        `;
    }
  }}

  &:focus {
    border-color: var(--color-primary-background);
  }
  &:hover {
    border-color: var(--color-primary-background);
  }
`;

export const PasswordInput = ({ value, type, ...rest }: any) => {
  const [passwordType, setPasswordType] = useReducer(
    (state) => (state ? "" : "password"),
    type
  );

  return (
    <>
      <Input {...rest} value={value} type={passwordType} />
    </>
  );
};

export const FormikInput = <T extends {}>({
  name,
  type,
  placeholder,
  autoComplete,
}: {
  name: string;
  type?: "password" | "default";
  placeholder?: string;
  autoComplete?: string;
}) => {
  if (type === "password") {
    return (
      <>
        <Field name={name}>
          {({ field }: FieldProps<T>) => (
            <PasswordInput
              {...field}
              placeholder={placeholder}
              autoComplete={autoComplete}
              type={type}
            />
          )}
        </Field>
        <ErrorMessage name={name} />
      </>
    );
  }

  return (
    <>
      <Field name={name}>
        {({ field }: FieldProps<T>) => (
          // @ts-ignore
          <Input {...field} placeholder={placeholder} />
        )}
      </Field>
      <ErrorMessage name={name} />
    </>
  );
};
