import React from "react";
import style from "./style.module.css";

import { ReactComponent as Logo } from "../../imgs/logo.svg";

const AuthForm = function ({ children, className }) {
  return (
    <div className={`${style.form} ${className}`}>
      <Logo className={style.logo} />
      {children}
    </div>
  );
};

export default AuthForm;
