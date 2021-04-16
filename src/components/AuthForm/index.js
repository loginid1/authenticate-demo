import React from "react";
import style from "./style.module.css";

import { ReactComponent as Logo } from "../../imgs/logo.svg";
import Input from "../Input/";
import Button from "../Button/";

const AuthForm = function ({ children }) {
  return (
    <div className={style.form}>
      <Logo className={style.logo} />
      {children}
    </div>
  );
};

export default AuthForm;