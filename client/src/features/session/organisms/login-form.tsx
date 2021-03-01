import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { FormikInput, Button } from "../../../ui";

import { FormWrapper, SessionFormHeader } from "../molecules";
import { signInFx } from "../model";
import { useStore } from "effector-react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().required("Обязательно для заполнения"),
  password: yup.string().required("Обязательно для заполнения"),
});

export const LoginForm = () => {
  const pending = useStore(signInFx.pending);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        signInFx(values);
      }}
    >
      {({ isValid }) => {
        return (
          <Form>
            <FormWrapper>
              <h1>Авторизация</h1>

              <SessionFormHeader />

              <FormikInput placeholder="Введите email" name="email" />
              <FormikInput
                placeholder="Введите пароль"
                name="password"
                type="password"
                autoComplete="off"
              />

              <Button type="submit" disabled={!isValid || pending}>
                Вход
              </Button>
            </FormWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};
