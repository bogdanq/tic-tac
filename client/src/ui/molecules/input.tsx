import React, { useMemo } from "react";
import { Field, FieldProps } from "formik";
import styled from "styled-components";
import { ErrorMessage } from "./input-error";

export const Input = styled.input<any>`
  border: 1px solid var(--color-default-border);
  border-radius: 5px;
  height: 25px;
  padding: 5px;
  font-size: 13px;
  color: var(--color-default-text);
  outline: none;
  transition: all 0.5s;
  background: var(--color-primary-background);

  &:focus {
    border-color: var(--color-primary-background);
  }
  &:hover {
    border-color: var(--color-primary-background);
  }
`;

export const PasswordInput = ({ value, ...rest }: any) => {
  const passwordValue = useMemo(() => {
    return value
      .split("")
      .map(() => "*")
      .join("");
  }, [value]);

  return <Input {...rest} value={passwordValue} />;
};

export const FormikInput = <T extends {}>({
  name,
  type,
  placeholder,
}: {
  name: string;
  type?: "password" | "default";
  placeholder?: string;
}) => {
  if (type === "password") {
    return (
      <>
        <Field name={name}>
          {({ field }: FieldProps<T>) => (
            <PasswordInput {...field} placeholder={placeholder} />
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
          <Input {...field} placeholder={placeholder} />
        )}
      </Field>
      <ErrorMessage name={name} />
    </>
  );
};
