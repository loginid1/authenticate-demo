import React, { useState, useEffect } from "react";
import style from "./style.module.css";

import { ReactComponent as Warning } from "../../imgs/warning_colored.svg";

const Toast = function ({ message }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 3000);
  }, []);

  return (
    <div className={!animate ? style.toast : style.close}>
      <div className={style.inner}>
        <Warning />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
