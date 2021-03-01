import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useStore } from "effector-react";

import { FormikInput, Button } from "../../../ui";
import { FormWrapper, SessionFormHeader } from "../molecules";
import { signUpFx } from "../model";

const initialValues = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Обязательно для заполнения"),
  email: yup.string().required("Обязательно для заполнения"),
  password: yup.string().required("Обязательно для заполнения"),
  repeatPassword: yup.string().required("Обязательно для заполнения"),
});

export const RegistrationForm = () => {
  const pending = useStore(signUpFx.pending);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        signUpFx(values);
      }}
    >
      {({ isValid }) => {
        return (
          <Form>
            <FormWrapper>
              <h1>Регистрация</h1>
              <SessionFormHeader />

              <FormikInput placeholder="Введите имя" name="name" />
              <FormikInput placeholder="Введите почту" name="email" />
              <FormikInput
                placeholder="Введите пароль"
                name="password"
                type="password"
              />
              <FormikInput
                placeholder="Повторите пароль"
                name="repeatPassword"
                type="password"
              />

              <Button type="submit" disabled={!isValid || pending}>
                Регистрация
              </Button>
            </FormWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};
