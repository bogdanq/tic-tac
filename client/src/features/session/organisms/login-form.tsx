import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { FormikInput, Button } from "../../../ui";

import { FormWrapper, SessionFormHeader } from "../molecules";

const initialValues = {
  name: "",
  password: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Обязательно для заполнения"),
  password: yup.string().required("Обязательно для заполнения"),
});

export const LoginForm = () => {
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
              <h1>Авторизация</h1>

              <SessionFormHeader />

              <FormikInput placeholder="Введите имя" name="name" />
              <FormikInput
                placeholder="Введите пароль"
                name="password"
                type="password"
              />

              <Button type="submit" disabled={!isValid}>
                Вход
              </Button>
            </FormWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};
