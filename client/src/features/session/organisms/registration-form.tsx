import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { FormikInput, Button } from "../../../ui";

import { FormWrapper, SessionFormHeader } from "../molecules";

const initialValues = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const validationSchema = yup.object({
  login: yup.string().required("Обязательно для заполнения"),
  email: yup.string().required("Обязательно для заполнения"),
  password: yup.string().required("Обязательно для заполнения"),
  repeatPassword: yup.string().required("Обязательно для заполнения"),
});

export const RegistrationForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
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
                name="password"
                type="password"
              />

              <Button type="submit" disabled={!isValid}>
                Регистрация
              </Button>
            </FormWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};
