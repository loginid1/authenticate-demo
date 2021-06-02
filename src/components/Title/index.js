import React from "react";
import style from "./style.module.css";

import { SmallButton } from "../Button/";

const Title = function ({ children, buttonText = "", onClick }) {
  return (
    <div className={style.wrapper}>
      {buttonText && <SmallButton secondary text={buttonText} onClick={onClick}/>}
      {children && <h1 className={style.title}>{children}</h1>}
    </div>
  );
};

export default Title;
