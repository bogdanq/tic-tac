import React from "react";
import { Row, Link } from "../../../ui";

export const SessionFormHeader = () => {
  return (
    <Row>
      <Link activeClassName="is-active" to="/sign-in">
        Вход
      </Link>
      <Link activeClassName="is-active" to="/sign-up">
        Регистрация
      </Link>
    </Row>
  );
};
